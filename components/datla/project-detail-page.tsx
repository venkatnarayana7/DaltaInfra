import Link from 'next/link';
import {MapPin,Building2,Ruler,CalendarCheck,Blocks,Sprout,ShieldCheck,BatteryCharging,CarFront,Droplets,Box} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ResponsiveImage} from './responsive-image';
import type {Project} from '@/lib/projects-content';
import {getCommunitiesContent} from '@/lib/communities-content';
const featureIcons={play:Blocks,garden:Sprout,security:ShieldCheck,power:BatteryCharging,parking:CarFront,water:Droplets};
export async function ProjectDetailPage({project}:{project:Project}){
 const communities=await getCommunitiesContent();
 const galleryImages=[project.image,'garden','interior'];
 return <main id="main" className="project-detail">
 <section className="project-detail-hero"><ResponsiveImage name={project.image} alt={project.imageAlt} sizes="100vw" className="project-detail-hero-picture"/><div className="container project-detail-hero-copy"><p className="eyebrow">DATLA INFRA · {project.status.toUpperCase()}</p><h1>{project.name}</h1></div></section>
 <section className="container project-detail-body">
 <div className="project-detail-grid">
 <div>
 <h2>About This Project</h2>
 <p className="project-detail-description">{project.description}</p>
 <h2>Amenities</h2>
 <ul className="amenity-chip-list">{communities.features.map(feature=>{const Icon=featureIcons[feature.icon as keyof typeof featureIcons];return <li key={feature.label}><Icon aria-hidden="true"/><span>{feature.label}</span></li>})}</ul>
 <h2>Gallery</h2>
 <div className="gallery-grid">{galleryImages.map((image,index)=><ResponsiveImage key={image+index} name={image} alt={index===0?project.imageAlt:'Reference-based illustration of a Datla Infra community amenity'} sizes="(max-width: 600px) 100vw, (max-width: 899px) 50vw, 25vw"/>)}</div>
 </div>
 <aside className="project-fact-card">
 <h2>Project Facts</h2>
 <dl>
 <div><dt>Status</dt><dd>{project.status}</dd></div>
 {project.location&&<div><dt><MapPin aria-hidden="true"/>Location</dt><dd>{project.location}</dd></div>}
 {project.totalFlats&&<div><dt><Building2 aria-hidden="true"/>Total Flats</dt><dd>{project.totalFlats}</dd></div>}
 {project.area&&<div><dt><Ruler aria-hidden="true"/>Project Area</dt><dd>{project.area}</dd></div>}
 {project.completedOn&&<div><dt><CalendarCheck aria-hidden="true"/>Completed On</dt><dd>{project.completedOn}</dd></div>}
 </dl>
 <Button disabled className="datla-button outline-button project-3d-button" aria-describedby="project-3d-note"><Box aria-hidden="true"/> Explore 3D Model</Button>
 <p id="project-3d-note" className="project-3d-note">The interactive building explorer is coming in a later phase.</p>
 <Button asChild className="datla-button"><Link href="/contact">Enquire About This Project</Link></Button>
 </aside>
 </div>
 </section>
 </main>;
}
