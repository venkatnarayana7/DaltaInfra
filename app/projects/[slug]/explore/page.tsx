import {notFound} from 'next/navigation';
import Link from '@/components/datla/link';
import {ArrowLeft} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {getProjectBySlug} from '@/lib/projects-content';
import {getBuildingExplorer} from '@/lib/explorer-content';
import {BuildingExplorer} from '@/components/datla/building-explorer';
export default async function ProjectExplore({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const project=await getProjectBySlug(slug);
 if(!project)notFound();
 const data=await getBuildingExplorer(slug);
 if(!data)return <main id="main" className="container route-reserved"><p className="eyebrow">DATLA INFRA · BUILDING EXPLORER</p><h1>{project.name}</h1><div className="gold-rule"/><h2>Floor plans aren&apos;t finalized yet.</h2><p>{project.name} is {project.status.toLowerCase()}, so a flat-by-flat explorer isn&apos;t available for it yet. Check back once floor plans are confirmed.</p><Button asChild className="datla-button"><Link href={'/projects/'+slug}><ArrowLeft/> Back to Project</Link></Button></main>;
 return <BuildingExplorer projectName={project.name} projectSlug={slug} data={data}/>;
}
