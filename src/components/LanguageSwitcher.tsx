import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`px-2 py-1 text-xs rounded border ${i18n.language === 'en' 
          ? 'bg-indigo-500 text-white border-indigo-500' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'}`}
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </button>
      <button
        className={`px-2 py-1 text-xs rounded border ${i18n.language === 'vn' 
          ? 'bg-indigo-500 text-white border-indigo-500' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'}`}
        onClick={() => changeLanguage('vn')}
      >
        {t('language.vn')}
      </button>
    </div>
  );
};


