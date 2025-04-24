import React from "react";
import DButton from "./d-button";

interface TabOption {
    id: string;
    label: string;
    color: "green" | "yellow" | "pink" | "blue" | "gray";
}

interface DTabNavigationProps {
    options: TabOption[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    centered?: boolean;
}

const DTabNavigation: React.FC<DTabNavigationProps> = ({
    options,
    activeTab,
    onTabChange,
    centered = false,
}) => {
    return (
        <div className={`flex ${centered ? "justify-center" : "justify-start"} mb-6 space-x-2`}>
            {options.map((option) => (
                <DButton
                    key={option.id}
                    label={option.label}
                    active={activeTab === option.id}
                    color={option.color}
                    onClick={() => onTabChange(option.id)}
                />
            ))}
        </div>
    );
};

export default DTabNavigation; 