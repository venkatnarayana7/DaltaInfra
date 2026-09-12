import snapshot from '@/data/preview-media.json';
// A single replacement point for the Firebase Storage + Firestore adapter in its scheduled phase.
export async function getMediaContent(){return snapshot;}
