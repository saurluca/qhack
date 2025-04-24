import React from "react";

interface DButtonProps {
    label: string;
    onClick?: () => void;
    active?: boolean;
    color?: "green" | "yellow" | "pink" | "blue" | "gray";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const DButton: React.FC<DButtonProps> = ({
    label,
    onClick,
    active = false,
    color = "gray",
    size = "md",
    fullWidth = false,
    icon,
}) => {
    const colorStyles = {
        green: {
            active: "bg-green-500 text-white",
            inactive: "bg-green-100 text-green-700 hover:bg-green-200",
        },
        yellow: {
            active: "bg-yellow-400 text-yellow-800",
            inactive: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        },
        pink: {
            active: "bg-pink-500 text-white",
            inactive: "bg-pink-100 text-pink-700 hover:bg-pink-200",
        },
        blue: {
            active: "bg-blue-500 text-white",
            inactive: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        },
        gray: {
            active: "bg-gray-500 text-white",
            inactive: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        },
    };

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-2.5 py-1.5",
        lg: "px-5 py-3 text-lg",
    };

    return (
        <button
            className={`${active ? colorStyles[color].active : colorStyles[color].inactive} ${sizeStyles[size]
                } ${fullWidth ? "w-full" : ""} rounded-md font-small transition flex items-center justify-center`}
            onClick={onClick}
        >
            {icon && <span className="mr-1">{icon}</span>}
            {label}
        </button>
    );
};

export default DButton;
