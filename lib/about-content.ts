import snapshot from '@/data/preview-about.json';
export type ValueItem = {title:string;description:string;icon:string};
// A single replacement point for the real-time Firebase adapter in its scheduled phase.
export async function getAboutContent(){return snapshot;}
