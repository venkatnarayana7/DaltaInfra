import {MediaPage} from '@/components/datla/media-page';
import {getMediaContent} from '@/lib/media-content';
export default async function Media(){const content=await getMediaContent();return <MediaPage heading={content.heading} support={content.subtitle} events={content.events} photos={content.photos} videos={content.videos}/>;}
