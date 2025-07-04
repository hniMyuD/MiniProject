interface InputProps {
    name?: string;
    label?: string;
    type?: string;
    labelCustom?: string;
    inputCustom?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
    labelCustom = "",
    inputCustom = "",
    error,
    ...props
}) => {
    return (
        <div className="flex flex-col mb-4">
            <label
                htmlFor={name}
                className={`${labelCustom}`}
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className={`${inputCustom}`}
                {...props}
            />
            {error && (
                <span className="text-red-500 text-sm">
                    {error}
                </span>
            )}
        </div>
    );
};