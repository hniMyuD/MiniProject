import {LuQuote } from "react-icons/lu";
import { useAuth } from "@context/AuthContext";
import { useTranslation } from "react-i18next";
export const UserProfileCard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    return(
        <div className="w-full flex flex-col items-center ">
          <h1 className="p-4 text-gray-500">{t("profile")}</h1>
          <div className="w-20 h-20 rounded-full mb-4">
            <img className="w-full h-full object-cover rounded-full" src={user?.avatar || "default-avatar.png"} alt="Avatar" />
          </div>
          <h1 className="text-blue-700 font-bold text-sm">{user?.name}</h1>

          <h1 className="text-gray-500 mt-6 ">{t("slogan")}</h1>

          <p className="p-4 text-gray-800 italic text-center">
            {user?.slogan}
          </p>
          <LuQuote className="text-gray-500 w-4 h-4" />
        </div>
    )
}