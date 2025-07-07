import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useTranslation } from "react-i18next";

export const UserExternalLinkCard = () => {
    const { t } = useTranslation();

    return(
        <div>
            <h1 className="p-4 text-gray-500 text-center">{t("externalLink")}</h1>

          <div className="px-4">
            <Input
            label={t("facebookUrl")}
            type="text"
            labelCustom="block text-sm font-medium text-gray-500 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Input
            label={t("websiteUrl")}
            type="text"
            labelCustom="block text-sm font-medium text-gray-500 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Input
            label={t("linkedInUrl")}
            type="text"
            labelCustom="block text-sm font-medium text-gray-500 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-center"> 
            <Button
            title={t("saveChanges")} 
            type="button"
            className="w-48 mt-4 py-2 px-4 rounded-md text-white
            bg-green-600 hover:bg-green-700 focus:outline-none "
            onClick={() => alert("Changes saved!")}
            />
          </div>
        </div>
    )
}