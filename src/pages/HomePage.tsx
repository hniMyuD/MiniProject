import { LanguageSwitcher } from "@components/LanguageSwitcher";
import { useAuth } from "@context/AuthContext";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-200 w-full flex justify-between h-12 items-center px-10">
                <h1 className="text-2xl font-bold ">Home page </h1>
                <LanguageSwitcher />
        </div>

      <p className="text-center">{t("greeting")} {user?.name}</p>
      <p className="text-center">{t("email")} {user?.email}</p>
      <p className="text-center">{t("id")} {user?.id}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer"
      >
        {t("logout")}
      </button>
    </div>
  );
};
