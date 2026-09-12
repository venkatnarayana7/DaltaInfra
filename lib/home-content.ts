import snapshot from '@/data/preview-home.json';
export type ProjectSummary = {id:string;name:string;detail:string;status:string;image:string;imageAlt:string};
// A single replacement point for the real-time Firebase adapter in its scheduled phase.
// Preview content is deliberately kept out of presentation components.
export async function getHomeContent(){return snapshot;}
