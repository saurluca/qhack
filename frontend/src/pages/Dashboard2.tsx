import React from 'react';
import { DHeader } from '../components/d-header';
import { DStatsHeader } from '../components/d-stats-header';
import { DTab } from '../components/d-tab';
import { DCo2Indicator } from '../components/d-co2-indicator';
import { DChoices } from '../components/d-choices';
import { DSupporter } from '../components/d-supporter';
import { DComparison } from '../components/d-comparison';
import Footer from '../components/Footer';
const Dashboard2: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('Sustainability');

    return (
        <div className="flex flex-col h-full bg-background p-4">
            <DHeader />

            <DStatsHeader />

            <div className="flex justify-center my-4">
            <div className="w-25 h-25 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        <img src="/dashboard.png" alt="Dashboard Icon" className="h-50 w-50 text-gray-500" />
                    </div>
            </div>

            <div className="flex space-x-2 mb-4">
                <DTab
                    label="Sustainability"
                    isActive={activeTab === 'Sustainability'}
                    onClick={() => setActiveTab('Sustainability')}
                />
                <DTab
                    label="Nutritional"
                    isActive={activeTab === 'Nutritional'}
                    onClick={() => setActiveTab('Nutritional')}
                />
                <DTab
                    label="Smart shopping"
                    isActive={activeTab === 'Smart shopping'}
                    onClick={() => setActiveTab('Smart shopping')}
                />
            </div>

            <h2 className="text-lg font-medium mb-4">Weekly overview</h2>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md w-[200px]">
                    <p className="text-sm text-gray-600 mb-2">
                        Your CO<sub>2</sub> footprint is below the German average
                    </p>
                    <DCo2Indicator value={3.6} maxValue={5} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DChoices />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DSupporter percentage={50} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DComparison value={0.1} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard2;
