import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '@locales/en/common.json';
import vnCommon from '@locales/vn/common.json';
import { storage } from '@utils/storage';


const resources = {
    en: {
        common: enCommon
    },
    vn: {       
        common: vnCommon
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: storage.get<string>("language") || 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
        escapeValue: false 
    },

})

export default i18n;