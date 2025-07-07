import { useAuth } from "@context/AuthContext";
import { useTranslation } from "react-i18next";

export const UserPersonalInfoCard = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [year, month, day] = user?.dob?.split("-") || [];

    return(
        <div className="w-full">
          <h1 className="p-4 text-gray-500 text-center">
            {t("personalInfo")}
          </h1>

          <div className="grid grid-cols-[1fr_4fr] px-4">
            <div className="p-2 text-gray-500">{t("name")}</div>
            <div className="p-2">
              <input
                type="text"
                value={user?.name || ""}
                className="w-full p-1 px-4 border border-gray-300 rounded"
                readOnly
              />
            </div>
            <div className="p-2 text-gray-500">Email</div>
            <div className="p-2">
              <input
                type="text"
                value={user?.email || ""}
                className="w-full p-1 px-4 border border-gray-300 rounded"
                readOnly
              />
            </div>
            <div className="p-2 text-gray-500">ID</div>
            <div className="p-2">
              <input
                type="text"
                value={user?.id || ""}
                className="w-full p-1 px-4 border border-gray-300 rounded"
                readOnly
              />
            </div>
          </div>
          <h1 className="p-4 text-gray-500 text-center">{t("dob")}</h1>
          <div className="flex justify-center items-center gap-8">
            <div className="h-14 w-14 border-2 border-gray-400 rounded-lg flex justify-center items-center text-xl">
              {day}
            </div>
            <div className="h-14 w-14 border-2 border-gray-400 rounded-lg flex justify-center items-center text-xl">
              {month}
            </div>
            <div className="h-14 w-14 border-2 border-gray-400 rounded-lg flex justify-center items-center text-xl">
              {year}
            </div>
          </div>
        </div>
    )
}