import Link from '@/components/datla/link';
import {Building2,Users,Landmark,Award,Blocks,Sprout,ShieldCheck,BatteryCharging,CarFront,Droplets,Play} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getHomeContent} from '@/lib/home-content';
import {ResponsiveImage} from './responsive-image';
import {ProjectsSection} from './projects-section';
const metricIcons={building:Building2,families:Users,construction:Landmark,award:Award};
const amenityIcons={play:Blocks,garden:Sprout,security:ShieldCheck,power:BatteryCharging,parking:CarFront,water:Droplets};
export async function Homepage(){
 const content=await getHomeContent();
 return <main id="main" className="homepage">
 <section className="home-hero" aria-labelledby="hero-heading"><div className="hero-picture"><ResponsiveImage name={content.hero.image} wide priority alt="Reference-based illustration of a contemporary apartment building with warm evening lights" sizes="100vw"/></div><div className="container hero-copy"><h1 id="hero-heading">{content.hero.lines.map((line,index)=><span className={index===2?'gold-text':undefined} key={line}>{line}</span>)}</h1><p className="hero-support">{content.hero.support.map(line=><span key={line}>{line}</span>)}</p><div className="hero-actions"><Button asChild className="datla-button"><a href="#projects">Explore Projects</a></Button><div className="film-action"><button type="button" className="watch-video" disabled aria-describedby="film-status"><span className="play-ring"><Play size={15} fill="currentColor"/></span>Watch Video</button><span id="film-status">Film coming soon</span></div></div></div></section>
 <section className="home-statistics" aria-label="Datla Infra at a glance"><div className="container metric-grid">{content.metrics.map(metric=>{const Icon=metricIcons[metric.icon as keyof typeof metricIcons];return <div className="metric" key={metric.label}><div><Icon aria-hidden="true"/><span>{metric.value}</span></div><p>{metric.label}</p></div>})}</div></section>
 <ProjectsSection projects={content.projects}/>
 <section className="home-communities" aria-labelledby="communities-heading"><div className="community-copy"><h2 id="communities-heading">{content.communities.heading.map(line=><span key={line}>{line}</span>)}</h2><p>{content.communities.description}</p><ul className="amenity-grid">{content.communities.amenities.map(item=>{const Icon=amenityIcons[item.icon as keyof typeof amenityIcons];return <li key={item.label}><Icon aria-hidden="true"/><span>{item.label}</span></li>})}</ul></div><div className="community-picture"><ResponsiveImage name="garden" alt="Reference-based illustration of a landscaped community path with trees, benches and warm lighting" sizes="(max-width: 767px) 100vw, 55vw"/></div></section>
 <section className="home-cta" aria-labelledby="cta-heading"><ResponsiveImage name="interior" wide alt="" sizes="100vw" className="cta-picture"/><div className="container cta-copy"><h2 id="cta-heading">{content.cta.heading}</h2><p>{content.cta.description}</p><Button asChild className="datla-button"><Link href="/contact">Contact Us</Link></Button></div></section>
 </main>;
}
