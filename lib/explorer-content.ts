import subhadra from '@/data/preview-explorer-subhadra-residency.json';
export type FlatStatus='available'|'occupied'|'booked';
export type Flat={floor:string;bhk:string;status:FlatStatus;owner?:string;purchasedOn?:string};
export type Floor={id:string;label:string;flats:string[]};
export type BuildingExplorer={hasTerrace:boolean;floors:Floor[];flats:Record<string,Flat>};
const explorers:Record<string,BuildingExplorer>={'subhadra-residency':subhadra as BuildingExplorer};
// A single replacement point for the Firestore projects/floors/flats adapter in its scheduled phase.
export async function getBuildingExplorer(slug:string){return explorers[slug]??null;}
