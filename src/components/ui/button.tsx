import React from "react";

interface Props {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: () => void;
  text: string;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  icon,
  text,
  ...rest
}) => {
  return (
    <button
      className="text-sm sm:text-xl md:text-xl font-bold tracking-wider rounded-xl py-2 px-4 bg-incard-blue font-semi-bold text-black hover:scale-105 border-2 border-incard-blue focus:ring-2 shadow-lg transform active:scale-100 transition-transform"
      onClick={onClick}
      {...rest}
    >
      {icon && <span>{icon}</span>}{" "}
      <span className="text-base tracking-widest font-medium">{text}</span>
    </button>
  );
};

export default Button;
