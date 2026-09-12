import {ProjectsPage} from '@/components/datla/projects-page';
import {getProjectsContent} from '@/lib/projects-content';
export default async function Projects(){const content=await getProjectsContent();return <ProjectsPage intro={content.intro} projects={content.projects}/>;}
