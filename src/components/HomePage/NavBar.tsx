import { RiArrowDropDownLine } from "react-icons/ri";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { Button } from "@components/Button";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
     logout();
  };

  return (
    <div className=" w-full bg-white flex justify-between h-16 items-center px-16">
      <h1 className="text-2xl font-bold ">Home page </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-300 rounded-full flex justify-center items-center">
            <h1 className="text-black">
              {user?.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </h1>
          </div>
          <h1 className="text-black w-30">{user?.name}</h1>
        </div>

        <RiArrowDropDownLine
          onClick={() => setIsOpen(!isOpen)}
          className="text-black w-8 h-8"
        />
      </div>
      {isOpen && (
        <div className="absolute right-16 top-14 bg-white shadow-lg">
          <div className="border-b-1 pb-2 border-gray-200 p-4">
            <LanguageSwitcher />
          </div>
          <div className="w-full flex items-center gap-2 p-4">
            <LuLogOut className="text-black w-4 h-4" />
            <Button
              title={t("logout")}
              type="button"
              onClick={handleLogout}
              className=" text-black text-sm cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
