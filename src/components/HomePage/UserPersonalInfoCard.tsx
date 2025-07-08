import { useAuth } from "@context/AuthContext";
import { useTranslation } from "react-i18next";
import { InfoField } from "../InfoField";

export const UserPersonalInfoCard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const year = user?.dob?.substring(0, 4);
  const month = user?.dob?.substring(5, 7);
  const day = user?.dob?.substring(8, 10);

  return (
    <div className="w-full">
      <h1 className="p-4 text-gray-500 text-center">{t("personalInfo")}</h1>

      <div className="flex flex-col px-6">
        <div className="flex flex-col gap-6">
          <InfoField
            label={t("name")}
            value={user?.name || ""}
            customClass="gap-6 items-center grid grid-cols-[1fr_7fr]"
          />
          <InfoField
            label={"Email"}
            value={user?.email || ""}
            customClass="gap-6 items-center grid grid-cols-[1fr_7fr]"
          />
          <InfoField
            label={"ID"}
            value={user?.id || ""}
            customClass="gap-6 items-center grid grid-cols-[1fr_7fr]"
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
  );
};
