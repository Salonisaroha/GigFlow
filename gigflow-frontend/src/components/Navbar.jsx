import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/auth/authSlice";
import api from "../services/api";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const logoutHandler = async () => {
    await api.post("/auth/logout");
    dispatch(logoutSuccess());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
              G
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              GigFlow
            </span>
          </Link>

          {user ? (
            <div className="flex gap-6 items-center">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Find Work
              </Link>
              <Link
                to="/my-applications"
                className={`text-sm font-medium transition-colors ${isActive('/my-applications') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Applications
              </Link>
              <Link
                to="/my-gigs"
                className={`text-sm font-medium transition-colors ${isActive('/my-gigs') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                My Jobs
              </Link>
              <Link
                to="/create-gig"
                className={`text-sm font-medium transition-colors ${isActive('/create-gig') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Post Job
              </Link>

              <div className="h-4 w-px bg-gray-300 mx-2"></div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[100px]">{user.email}</p>
                </div>
                <button
                  onClick={logoutHandler}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-500 hover:text-indigo-600 font-medium transition-colors my-auto">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
