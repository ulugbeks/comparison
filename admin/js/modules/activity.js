export const loadRecentActivity = () => {
    // In a real application, this would fetch data from an API
    const activities = [
        {
            type: 'product',
            title: 'New product added',
            description: 'Added "Apple iPhone 14 Pro Max 256GB" to the database',
            time: '2 hours ago',
            icon: '📦'
        },
        {
            type: 'price',
            title: 'Price change detected',
            description: 'Price drop for "Samsung Galaxy S22 Ultra" from UZS 9,200,000 to UZS 8,700,000',
            time: '4 hours ago',
            icon: '💰'
        },
        {
            type: 'vendor',
            title: 'New vendor joined',
            description: 'Vendor "ElectroMart" has been approved and added to the platform',
            time: '7 hours ago',
            icon: '🏪'
        }
    ];
    
    updateActivityList(activities);
};

const updateActivityList = (activities) => {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
};