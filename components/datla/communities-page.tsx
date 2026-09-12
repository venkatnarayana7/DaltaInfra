import {Blocks,Sprout,ShieldCheck,BatteryCharging,CarFront,Droplets} from 'lucide-react';
import {getCommunitiesContent} from '@/lib/communities-content';
import {PageHero} from './page-hero';
import {CtaBand} from './cta-band';
import {ResponsiveImage} from './responsive-image';
const featureIcons={play:Blocks,garden:Sprout,security:ShieldCheck,power:BatteryCharging,parking:CarFront,water:Droplets};
export async function CommunitiesPage(){
 const content=await getCommunitiesContent();
 return <main id="main" className="communities-page">
 <PageHero eyebrow={content.hero.eyebrow} heading={content.hero.heading} support={content.hero.support}/>
 <div className="communities-banner"><ResponsiveImage name={content.hero.bannerImage} alt="Reference-based illustration of a landscaped community path with trees, benches and warm lighting" sizes="100vw"/></div>
 <section className="container" aria-labelledby="features-heading"><div className="home-section-heading"><h2 id="features-heading">Every Community Includes</h2></div><div className="features-grid">{content.features.map(feature=>{const Icon=featureIcons[feature.icon as keyof typeof featureIcons];return <div className="feature-card" key={feature.label}><Icon aria-hidden="true"/><h3>{feature.label}</h3><p>{feature.description}</p></div>})}</div></section>
 <section className="container" aria-label="Community photography"><div className="gallery-grid">{content.gallery.map(item=><ResponsiveImage key={item.image} name={item.image} alt={item.alt} sizes="(max-width: 600px) 100vw, (max-width: 899px) 50vw, 25vw"/>)}</div></section>
 <CtaBand heading={content.cta.heading} description={content.cta.description} image={content.cta.image}/>
 </main>;
}
