import { NavLink, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';

const links = [
  { to: '/', label: 'Map' },
  { to: '/report', label: 'Report' },
  { to: '/store', label: 'Rewards' },
  { to: '/profile', label: 'Profile' },
];

const TopNav = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const userLabel = user?.email ?? 'Guest';
  const pseudoWallet = user ? `ID-${user.id.slice(-6).toUpperCase()}` : 'Not connected';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-bold">doITbetter</span>
      </div>
      <div className="flex space-x-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-5 py-2 font-medium text-sm rounded-pill transition-all ${
                isActive
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <div>{userLabel}</div>
          <div>{pseudoWallet}</div>
        </div>
        <Wallet className="h-5 w-5" />
        {isAuthenticated ? (
          <button onClick={handleSignOut} type="button" aria-label="sign-out">
            <LogOut className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={() => navigate('/login')} type="button" aria-label="sign-in">
            <LogIn className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopNav;
