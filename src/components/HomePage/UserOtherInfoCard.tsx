import { useTranslation } from "react-i18next";
import { InfoField } from "../InfoField";
import { useAuth } from "@/context/AuthContext";

export const UserOtherInfoCard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div>
      <h1 className="p-4 text-gray-500 text-center">{t("otherInfo")}</h1>
      <div className="px-6 space-y-4">
  
        <div className="grid grid-cols-2 gap-4">
          <InfoField
            label= {t("cell")}
            value={user?.cell ?? ""}
            customClass="gap-2 flex-col"
          />
          <InfoField
            label={t("phone")}
            value={user?.phone ?? ""}
            customClass="gap-2 flex-col"
          />
          <InfoField
            label={t("country")}
            value={user?.location?.country ?? ""}
            customClass="gap-2 flex-col"
          />
          <InfoField
            label={t("state")}
            value={user?.location?.state ?? ""}
            customClass="gap-2 flex-col"
          />
          <InfoField
            label={t("city")}
            value={user?.location?.city ?? ""}
            customClass="gap-2 flex-col"
          />
          <InfoField
            label={t("postcode")}
            value={user?.location?.postcode ?? ""}
            customClass="gap-2 flex-col"
          />
        </div>
         <InfoField
          label={t("address")}
          value={user?.location?.address ?? ""}
          customClass="gap-2 flex-col"
        />
      </div>
    </div>
  );
};
