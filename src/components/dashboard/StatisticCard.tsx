import React from 'react';

interface StatisticCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ 
  title, 
  value, 
  icon,
  color = 'bg-white'
}) => {
  return (
    <div className={`${color} rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105 duration-300`}>
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatisticCard;