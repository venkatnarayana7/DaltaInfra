import snapshot from '@/data/preview-projects.json';
export type Project = {id:string;name:string;detail:string;status:string;image:string;imageAlt:string;location?:string;totalFlats?:number;area?:string;completedOn?:string;description?:string};
// A single replacement point for the real-time Firebase adapter in its scheduled phase.
export async function getProjectsContent(){return snapshot;}
export async function getProjectBySlug(slug:string){return snapshot.projects.find(p=>p.id===slug);}
