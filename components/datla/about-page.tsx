import {ShieldCheck,Gem,Clock,HeartHandshake,MapPin,Building2,Hammer,Headset} from 'lucide-react';
import {getAboutContent} from '@/lib/about-content';
import {PageHero} from './page-hero';
import {StatStrip} from './stat-strip';
import {CtaBand} from './cta-band';
import {ResponsiveImage} from './responsive-image';
const valueIcons={shield:ShieldCheck,gem:Gem,clock:Clock,handshake:HeartHandshake};
const whyIcons={map:MapPin,building:Building2,hammer:Hammer,headset:Headset};
export async function AboutPage(){
 const content=await getAboutContent();
 return <main id="main" className="about-page">
 <PageHero eyebrow={content.hero.eyebrow} heading={content.hero.heading} support={content.hero.support}/>
 <section className="container about-story" aria-labelledby="story-heading"><div className="about-story-copy"><h2 id="story-heading">{content.story.heading}</h2>{content.story.paragraphs.map(p=><p key={p}>{p}</p>)}</div><div className="about-story-image"><ResponsiveImage name={content.story.image} alt="Reference-based illustration of a landscaped Datla Infra community" sizes="(max-width: 899px) 100vw, 46vw"/></div></section>
 <section className="container about-vision-mission" aria-label="Vision and mission"><div className="vm-card"><h3>Our Vision</h3><p>{content.vision}</p></div><div className="vm-card"><h3>Our Mission</h3><p>{content.mission}</p></div></section>
 <section className="container" aria-labelledby="values-heading"><div className="home-section-heading"><h2 id="values-heading">Our Values</h2></div><div className="values-grid">{content.values.map(value=>{const Icon=valueIcons[value.icon as keyof typeof valueIcons];return <div className="value-card" key={value.title}><Icon aria-hidden="true"/><h3>{value.title}</h3><p>{value.description}</p></div>})}</div></section>
 <section className="why-choose" aria-labelledby="why-heading"><div className="container"><div className="home-section-heading"><h2 id="why-heading">Why Choose Datla Infra</h2></div><div className="why-grid">{content.whyChooseUs.map(item=>{const Icon=whyIcons[item.icon as keyof typeof whyIcons];return <div className="why-item" key={item.title}><Icon aria-hidden="true"/><div><h3>{item.title}</h3><p>{item.description}</p></div></div>})}</div></div></section>
 <StatStrip metrics={content.stats}/>
 <CtaBand heading={content.cta.heading} description={content.cta.description} image={content.cta.image}/>
 </main>;
}
