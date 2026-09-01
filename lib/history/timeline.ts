import type { TimelineEvent } from '@/types/prediction-history';
export const sortTimeline=(events:TimelineEvent[])=>[...events].sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
