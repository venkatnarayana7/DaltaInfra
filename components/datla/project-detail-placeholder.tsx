import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {Project} from '@/lib/projects-content';
export function ProjectDetailPlaceholder({project}:{project:Project}){
 return <main id="main" className="container route-reserved"><p className="eyebrow">DATLA INFRA · PHASE 04</p><h1>{project.name}</h1><div className="gold-rule"/><h2>Full project detail page is next.</h2><p>{project.status}{project.location?' · '+project.location:''}{project.totalFlats?' · '+project.totalFlats+' Flats':''}<br/>The gallery, amenities, architectural information and the Explore 3D Model experience for {project.name} are scheduled for Phase 4 and Phase 5.</p><Button asChild className="datla-button"><Link href="/projects"><ArrowLeft/> Back to Projects</Link></Button></main>;
}
