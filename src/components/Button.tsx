interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className}`}
    >
      {title}
    </button>
  );
};
