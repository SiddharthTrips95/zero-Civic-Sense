import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Award, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-civic-blue scale-110' : 'text-white/60 hover-white'
          }`
        }
      >
        <Home size={20} />
        Home
      </NavLink>

      <NavLink
        to="/report"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-civic-blue scale-110' : 'text-white/60 hover-white'
          }`
        }
      >
        <PlusCircle size={20} />
        Report
      </NavLink>

      <NavLink
        to="/rewards"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-civic-blue scale-110' : 'text-white/60 hover-white'
          }`
        }
      >
        <Award size={20} />
        Rewards
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all ${
            isActive ? 'text-civic-blue scale-110' : 'text-white/60 hover-white'
          }`
        }
      >
        <User size={20} />
        Profile
      </NavLink>
    </nav>
  );
};

export default BottomNav;

