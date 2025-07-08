interface InfoFieldProps {
    label: string;
    value: string;
    customClass?: string;
}

export const InfoField: React.FC<InfoFieldProps> = ({ label, value, customClass }) =>  {
  return (
    <div className={`flex text-sm text-gray-600 dark:text-gray-400 ${customClass}`}>
      <label htmlFor={label} className="block text-sm font-medium text-gray-500">{label}</label>
      <input id={label} value={value} readOnly className="block w-full text-green-700 px-3 py-2 border rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
  );
}