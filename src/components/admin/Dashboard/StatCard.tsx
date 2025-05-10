import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changePeriod?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changePeriod = 'vs last month',
  color
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary-500';
      case 'secondary':
        return 'bg-secondary-50 text-secondary-500';
      case 'accent':
        return 'bg-accent-50 text-accent-500';
      case 'success':
        return 'bg-success-50 text-success-500';
      case 'warning':
        return 'bg-warning-50 text-warning-500';
      case 'error':
        return 'bg-error-50 text-error-500';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${getColorClass()}`}>
          {icon}
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <div className="flex items-center text-success-500">
              <TrendingUp size={16} className="mr-1" />
              <span className="font-medium">{Math.abs(change)}%</span>
            </div>
          ) : isNegative ? (
            <div className="flex items-center text-error-500">
              <TrendingDown size={16} className="mr-1" />
              <span className="font-medium">{Math.abs(change)}%</span>
            </div>
          ) : (
            <span className="text-gray-500">No change</span>
          )}
          <span className="text-xs text-gray-500 ml-2">{changePeriod}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;