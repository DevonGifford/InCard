import React from 'react'

interface Props {
    children?: React.ReactNode;
    icon?: React.ReactElement
    onClick?: () => void;
    text: string,
}

const Button: React.FC<Props> =({
    children,
    onClick,
    icon,
    text,
    ...rest
}) => {
    return (
        <button
            className="text-sm sm:text-xl md:text-2xl tracking-wider rounded-xl py-2 px-4 bg-gray-700 font-semi-bold text-orange-500 border-2 border-orange-600"
            onClick={onClick}
            {...rest} // Pass any other button props
        >
            {icon && <span className=''>{icon}</span>} {/* Render the icon if provided */}
            <span className=''>{text}</span>
        </button>
    );
};

export default Button;