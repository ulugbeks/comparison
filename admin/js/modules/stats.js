export const loadDashboardStats = () => {
    // In a real application, this would fetch data from an API
    const stats = {
        users: {
            total: 12842,
            trend: 12.5
        },
        vendors: {
            total: 87,
            trend: 8.1
        },
        products: {
            total: 1259,
            trend: 32.7
        },
        pageViews: {
            total: 584295,
            trend: -2.4
        }
    };
    
    updateStatCards(stats);
};

const updateStatCards = (stats) => {
    // Update users stat
    updateStatCard('users', stats.users);
    
    // Update vendors stat
    updateStatCard('vendors', stats.vendors);
    
    // Update products stat
    updateStatCard('products', stats.products);
    
    // Update page views stat
    updateStatCard('pageViews', stats.pageViews);
};

const updateStatCard = (type, data) => {
    const card = document.querySelector(`[data-stat="${type}"]`);
    if (!card) return;
    
    const valueEl = card.querySelector('.stat-value');
    const trendEl = card.querySelector('.stat-trend');
    
    if (valueEl) {
        valueEl.textContent = formatNumber(data.total);
    }
    
    if (trendEl) {
        trendEl.textContent = `${data.trend > 0 ? '+' : ''}${data.trend}% vs last month`;
        trendEl.className = `stat-trend ${data.trend >= 0 ? 'positive' : 'negative'}`;
    }
};

const formatNumber = (num) => {
    return new Intl.NumberFormat('uz-UZ').format(num);
};