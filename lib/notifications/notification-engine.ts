import type { UserNotification } from '@/types/notification';import type { UserPreferences } from '@/types/user-preferences';
export const visibleNotifications=(items:UserNotification[],preferences:UserPreferences)=>items.filter(n=>!preferences.notifications.favoritesOnly||!n.matchId||preferences.favoriteMatchIds.includes(n.matchId));
