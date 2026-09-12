import {notFound} from 'next/navigation';
import {ProjectDetailPage} from '@/components/datla/project-detail-page';
import {getProjectsContent,getProjectBySlug} from '@/lib/projects-content';
export async function generateStaticParams(){const content=await getProjectsContent();return content.projects.map(p=>({slug:p.id}));}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=await getProjectBySlug(slug);if(!project)notFound();return <ProjectDetailPage project={project}/>;}
