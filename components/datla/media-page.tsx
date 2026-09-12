'use client';
import {useState} from 'react';
import {Video,Camera} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Button} from '@/components/ui/button';
import {ResponsiveImage} from './responsive-image';
import {PageHero} from './page-hero';
type MediaItem={title:string;image:string;alt:string};
type Props={heading:string;support:string;events:MediaItem[];photos:MediaItem[];videos:MediaItem[]};
const tabs=['Events','Photos','Videos'] as const;
export function MediaPage({heading,support,events,photos,videos}:Props){
 const [tab,setTab]=useState<typeof tabs[number]>('Events');
 const byTab={Events:events,Photos:photos,Videos:videos}[tab];
 return <main id="main" className="media-page">
 <PageHero eyebrow="DATLA INFRA · MEDIA" heading={[heading]} support={support}/>
 <section className="container" aria-label="Media gallery">
 <Tabs value={tab} onValueChange={value=>setTab(value as typeof tabs[number])}><TabsList variant="line" aria-label="Media category" className="project-filter-list media-tab-list">{tabs.map(item=><TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}</TabsList>
 <TabsContent value={tab}>{byTab.length>0?<div className="media-grid">{byTab.map(item=><figure className="media-card" key={item.title}><ResponsiveImage name={item.image} alt={item.alt} sizes="(max-width: 600px) 100vw, (max-width: 899px) 50vw, 25vw"/><figcaption>{item.title}</figcaption></figure>)}</div>:<p className="media-empty">{tab} will appear here once added.</p>}</TabsContent>
 </Tabs>
 <div className="media-socials"><Button variant="outline" disabled className="datla-button light-outline" aria-describedby="media-social-note"><Video aria-hidden="true"/> View on YouTube</Button><Button variant="outline" disabled className="datla-button light-outline" aria-describedby="media-social-note"><Camera aria-hidden="true"/> Follow on Instagram</Button></div>
 <p id="media-social-note" className="media-social-note">Social links coming soon.</p>
 </section>
 </main>;
}
