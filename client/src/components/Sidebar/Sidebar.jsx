import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaAngleRight,
  FaAngleLeft,
  FaMapMarkedAlt,
  FaUsers,
  FaCalendarPlus,
  FaCog,
  FaPlus,
} from "react-icons/fa";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  hasVehicle,
  vehicle,
}) => {
  return (
    <div
      className={`relative ${
        isSidebarOpen ? "w-64" : "w-0"
      } bg-gray-800 transition-width duration-300 p-4`}
    >
      {isSidebarOpen && (
        <>
          {user && (
            <div className="text-center mb-5 mt-8 bg-gray-700 rounded-lg py-6">
              <div className="relative group">
                <img
                  className="w-20 h-20 rounded-full mx-auto"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
              </div>
              <p className="text-lg font-semibold mt-2">
                {user.username || "User"} {/* Display the username */}
              </p>
              <Link to="/profile">
                <button className="text-sm text-gray-400 hover:text-gray-200">
                  Edit Profile
                </button>
              </Link>
            </div>
          )}

          {hasVehicle && vehicle ? (
            <Link to="/add-vehicle">
              <div className="flex items-center justify-center p-4 text-center bg-gray-700 rounded-lg hover:bg-gray-900">
                <FaCar className="text-2xl text-[#4FD1C5] mr-2" />
                <p className="text-lg">{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</p>
              </div>
            </Link>
          ) : (
            <Link to="/add-vehicle">
              <div className="flex items-center justify-center p-4 text-center bg-gray-700 rounded-lg hover:bg-gray-900">
                <FaPlus className="text-2xl text-[#4FD1C5] mr-2" />
                <p className="text-lg">Add Vehicle</p>
              </div>
            </Link>
          )}
          <ul>
            <Link to="#">
              <li className="my-2 hover:bg-gray-700 p-2 rounded-md flex items-center">
                <FaMapMarkedAlt className="mr-2" />
                Explore Car Meets
              </li>
            </Link>
            <Link to="/explore-communities">
              <li className="my-2 hover:bg-gray-700 p-2 rounded-md flex items-center">
                <FaUsers className="mr-2" />
                Explore Communities
              </li>
            </Link>
            <Link to="/create-community">
              <li className="my-2 hover:bg-gray-700 p-2 rounded-md flex items-center">
                <FaUsers className="mr-2" />
                Create a Community
              </li>
            </Link>

            <Link to="#">
              <li className="my-2 hover:bg-gray-700 p-2 rounded-md flex items-center">
                <FaCalendarPlus className="mr-2" />
                Create a Car Meet
              </li>
            </Link>
            <Link to="#">
              <li className="my-2 hover:bg-gray-700 p-2 rounded-md flex items-center">
                <FaCog className="mr-2" />
                Settings
              </li>
            </Link>
          </ul>
        </>
      )}
      <button
        className={`absolute ${
          isSidebarOpen ? "top-1/2 -right-5" : "top-1/2 -right-5"
        } transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-full`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaAngleLeft size={20} color="#4FD1C5" />
        ) : (
          <FaAngleRight size={20} color="#4FD1C5" />
        )}
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string, // Updated to expect username
    photoURL: PropTypes.string,
  }),
  hasVehicle: PropTypes.bool,
  vehicle: PropTypes.shape({
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
  }),
};

export default Sidebar;
