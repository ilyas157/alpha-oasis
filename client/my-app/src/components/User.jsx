import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User2, User as UserIcon } from 'lucide-react';

const User = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for login state
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/connexion');
  };

  return (
    <div className="navbar-end gap-5 mr-10">
      {!isLoggedIn && (
        <div className="space-x-1.5">
          <button
            onClick={() => navigate('/connexion')}
            className="btn  btn-ghost text-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-ghost  text-lg "
          >
            Sign Up
          </button>
        </div>
      )}

      {isLoggedIn && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle p-1  w-15 h-15 avatar"
          >
           
            <User2 className='w-30 h-30 '/>

          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button
                className="text-xl w-full flex items-center gap-2"
                onClick={() => navigate('/profile')}
              >
                <UserIcon className="h-4 w-4" /> Profile
              </button>
            </li>
            <li>
              <button
                className="text-xl w-full flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
