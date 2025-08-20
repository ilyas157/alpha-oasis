import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '../../components/details/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/dialog';
import {
  Search,
  Eye,
  Trash2,
  PlusCircle,
  Edit,
  Users,
  UserCog,
  User,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/ui/card';

const UsersAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    genre: 'homme',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users');
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const userCount = users.filter((u) => u.role === 'user').length;

  // Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenForm = (user = null) => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        genre: user.genre,
        role: user.role,
        password: '',
        _id: user._id,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        password: '',
        genre: 'homme',
      });
    }
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData._id) {
        await axios.put(
          `http://localhost:5000/api/users/${formData._id}`,
          formData
        );
      } else {
        await axios.post('http://localhost:5000/api/users', formData);
      }
      fetchUsers();
      setFormOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        password: '',
        genre: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Utilisateurs',
      value: totalUsers,
      icon: Users,
      color: 'bg-yellow-300 text-yellow-800',
    },
    {
      title: 'Admins',
      value: adminCount,
      icon: UserCog,
      color: 'bg-yellow-300 text-yellow-900',
    },
    {
      title: 'Utilisateurs',
      value: userCount,
      icon: User,
      color: 'bg-yellow-300 text-yellow-800',
    },
  ];
  return (
    <div>
      {/* Section: Utilisateurs - Statistiques */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="shadow-md rounded-2xl border border-yellow-200 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 p-6">
                <div
                  className={`p-3 rounded-full flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Actions */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Gestion des utilisateurs</h2>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => handleOpenForm()}
        >
          <PlusCircle className="h-4 w-4" /> Ajouter un utilisateur
        </button>
      </div>

      {/* Section: Recherche */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Recherche</h3>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-fit rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${
                      user.role === 'admin'
                        ? 'bg-orange-400 text-orange-900 hover:bg-orange-500'
                        : ''
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <button onClick={() => handleViewUser(user)}>
                    <Eye className="h-4 w-4" />
                  </button>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg rounded-xl shadow-2xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
              Détails de l'utilisateur
            </DialogTitle>
            {selectedUser && (
              <DialogDescription className="text-gray-500 text-sm">
                {selectedUser.firstName} {selectedUser.lastName}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Informations personnelles
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Nom</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Prénom</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Genre</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.genre}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Téléphone</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.phone}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 text-sm">Rôle</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedUser.role === 'admin'
                          ? 'bg-orange-400 text-white  hover:bg-orange-500'
                          : 'bg-green-500 text-white hover:bg-green-600 '
                      }`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

             
            </div>
          )}

          <DialogFooter>
            <button
              className="w-full mt-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 transition"
              onClick={() => setDialogOpen(false)}
            >
              Fermer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg rounded-xl shadow-2xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
              {formData._id ? 'Modifier' : 'Ajouter'} un utilisateur
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nom
                </label>
                <input
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Prénom
                </label>
                <input
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Genre
                </label>
                <select
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Téléphone
                </label>
                <input
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mot de passe
                </label>
                <input
                  placeholder="Mot de passe"
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required={!formData._id}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Rôle
              </label>
              <select
                value={formData.role || 'user'}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full rounded-lg bg-gray-100 px-4 py-2 shadow-sm focus:shadow-md transition"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <DialogFooter>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersAdmin;
