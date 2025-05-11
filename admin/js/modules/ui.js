export const initializeAdminUI = () => {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize header actions
    initializeHeaderActions();
    
    // Initialize responsive behavior
    initializeResponsive();
};

const initializeSidebar = () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
};

const initializeHeaderActions = () => {
    const searchBox = document.querySelector('.search-box input');
    const notificationsBtn = document.querySelector('.notifications-btn');
    
    if (searchBox) {
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch(e.target.value);
            }
        });
    }
    
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            // Implement notifications panel
            console.log('Notifications clicked');
        });
    }
};

const initializeResponsive = () => {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
};

const handleSearch = (query) => {
    // Implement admin search functionality
    console.log('Searching for:', query);
};