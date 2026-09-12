import snapshot from '@/data/preview-communities.json';
// A single replacement point for the real-time Firebase adapter in its scheduled phase.
export async function getCommunitiesContent(){return snapshot;}
