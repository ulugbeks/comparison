import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'product' | 'vendor' | 'user' | 'price';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  {activity.user && (
                    <>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        {activity.user.avatar ? (
                          <img
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-medium">
                            {activity.user.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900 mr-2">{activity.user.name}</span>
                    </>
                  )}
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
                <p className="text-gray-800 font-medium mb-1">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">No recent activity found</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;