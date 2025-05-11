// Import modules
import { initializeAdminUI } from './modules/ui.js';
import { loadDashboardStats } from './modules/stats.js';
import { loadRecentActivity } from './modules/activity.js';
import { initializeAuth } from './modules/auth.js';

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminUI();
    initializeAuth();
    loadDashboardStats();
    loadRecentActivity();
});