import snapshot from '@/data/preview-customers.json';
export type Customer = {name:string;project:string;flatNo:string;purchasedOn:string};
// Seed/demo records only — not a live customer database. A single replacement point for the protected Firestore adapter in its scheduled phase.
export async function getCustomersContent(){return snapshot;}
