import User from '../models/User.js';
import bcrypt from 'bcrypt';

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Ne pas retourner les passwords
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// GET user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST create user (Inscription)
export const createUser = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phone , genre} =
      req.body;
    // Vérifier que l'email et username n'existent pas déjà

    const exists = await User.findOne({ $or: [{ email }] });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Email ou nom d'utilisateur déjà utilisé" });
    }

    // Création de l'utilisateur (le hash du password se fait via le hook pre-save)
    const user = new User({
      email,
      password,
      role,
      firstName,
      lastName,
      phone,
      genre
    });
    await user.save();

    // Ne pas renvoyer le password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

// PUT update user
export const updateUser = async (req, res) => {
  try {
    const { email, username, firstName, lastName, phone, role, password } =
      req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    // Vérifie si l'email ou le username sont modifiés et existent déjà
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
      user.email = email;
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res
          .status(400)
          .json({ message: "Ce nom d'utilisateur est déjà utilisé" });
      }
      user.username = username;
    }

    // Mise à jour des autres champs
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (role) user.role = role;

    // Si mot de passe changé, il sera hashé grâce au hook pre-save
    if (password) user.password = password;

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};
