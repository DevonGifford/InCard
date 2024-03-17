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
      className="text-sm sm:text-xl md:text-xl font-bold tracking-wider rounded-full py-2 px-4 bg-incard-blue font-semi-bold text-black hover:scale-105 border-2 border-incard-blue focus:ring-2 shadow-lg transform active:scale-90 transition-transform"
      onClick={onClick}
      {...rest} // Pass any other button props
    >
      {icon && <span className="">{icon}</span>}{" "}
      {/* Render the icon if provided */}
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
