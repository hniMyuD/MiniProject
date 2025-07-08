import { NavBar } from "@/components/HomePage/NavBar";
import { UserProfileCard } from "@/components/HomePage/UserProfileCard";
import { UserPersonalInfoCard } from "@/components/HomePage/UserPersonalInfoCard";
import { UserOtherInfoCard } from "@/components/HomePage/UserOtherInfoCard";

export const HomePage = () => {
  return (
    <div className="flex flex-col border-2 h-screen bg-gray-100">
      <NavBar />

      <div className="h-100 m-6 bg-white rounded-lg flex shadow-lg">
        <div className="w-1/5 border-r-2 border-gray-200">
          <UserProfileCard />
        </div>

        <div className="w-2/5 border-r-2 border-gray-200">
          <UserPersonalInfoCard />
        </div>

        <div className="w-2/5">
          <UserOtherInfoCard />
        </div>
      </div>
    </div>
  );
};
