import { useState, useEffect } from "react";
import YourCommunities from "../../components/Communities/YourCommunities";
import { useAuth } from "../../hooks/useAuth";
import { useHasVehicle } from "../../hooks/useHasVehicle";
import axios from "axios";
import HeroSection from "../../components/HeroSection/HeroSection";
import VehicleSection from "../../components/Vehicles/VehicleSection/VehicleSection";
import Information from "../../components/Information/Information";

function App() {
  const user = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const hasVehicle = useHasVehicle();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/users/${user.email}`
          );
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  useEffect(() => {
    const fetchUserVehicle = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/vehicles?userEmail=${user.email}`
          );
          if (response.data.length > 0) {
            setVehicle(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user vehicle:", error);
        }
      }
    };

    fetchUserVehicle();
  }, [user]);

  // Extract the first name
  const firstName = userDetails ? userDetails.displayName.split(" ")[0] : "";

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 bg-white text-black">
         {/* Welcome User */}
         {userDetails && (
          <div className="mt-2 text-center p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-semibold">
              Welcome to DriveGather, {firstName}
            </h2>
          </div>
        )}
        {/* Hero Section */}
          <HeroSection />
       
        <Information />
        {/* User Vehicle */}
        <VehicleSection user={user} hasVehicle={hasVehicle} vehicle={vehicle} />
        {/* Communities */}
        <YourCommunities user={user} />
      </div>
    </div>
  );
}

export default App;
