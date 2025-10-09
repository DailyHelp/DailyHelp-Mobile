import {appStore} from './stores/appStore';

export const TabBadgeUtils = {
  // Set badge count for a specific tab
  setBadge: (tabName: string, count: number) => {
    appStore.setTabBadge(tabName, count);
  },

  // Increment badge count by 1
  incrementBadge: (tabName: string) => {
    appStore.incrementTabBadge(tabName);
  },

  // Decrement badge count by 1
  decrementBadge: (tabName: string) => {
    appStore.decrementTabBadge(tabName);
  },

  // Clear badge (set to 0)
  clearBadge: (tabName: string) => {
    appStore.clearTabBadge(tabName);
  },

  // Clear all badges
  clearAllBadges: () => {
    appStore.clearAllTabBadges();
  },

  // Get current badge count
  getBadgeCount: (tabName: string) => {
    return appStore.tabBadges[tabName] || 0;
  },

  // Example usage for common tabs
  setChatBadge: (count: number) => {
    appStore.setTabBadge('ChatIndex', count);
  },

  setJobsBadge: (count: number) => {
    appStore.setTabBadge('JobsIndex', count);
  },

  setSearchBadge: (count: number) => {
    appStore.setTabBadge('SearchIndex', count);
  },

  setMoreBadge: (count: number) => {
    appStore.setTabBadge('MoreIndex', count);
  },
};
