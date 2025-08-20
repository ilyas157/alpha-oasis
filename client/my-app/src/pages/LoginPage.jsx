import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.message || 'Erreur de connexion');
        return;
      }

      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Erreur serveur');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Connexion Admin</h2>

        {error && (
          <div className="flex justify-center">
            <div className="alert alert-error rounded-xl py-2 w-80 text-sm">
              {error}
            </div>
          </div>
        )}

        <form
          className="flex flex-col items-center gap-5"
          onSubmit={handleLogin}
        >
          <div className="w-80 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Adresse Email</span>
            </label>
            <input
              type="email"
              placeholder="email@exemple.com"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-80 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <button type="submit" className="btn btn-primary w-full">
              Se connecter
            </button>
          )}
        </form>

        <p className="text-center text-sm text-gray-500">
          Vous n'avez pas de compte admin ? Contactez l’administrateur ou{' '}
          <Link to="/" className="link text-blue-600">
            retournez à l’accueil
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
