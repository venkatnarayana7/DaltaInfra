'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Button} from '@/components/ui/button';
import {ResponsiveImage} from './responsive-image';
import {PageHero} from './page-hero';
import type {Project} from '@/lib/projects-content';
const categories=['All Projects','Completed','Under Construction','Upcoming'];
type Props={intro:{eyebrow:string;heading:string;support:string};projects:Project[]};
export function ProjectsPage({intro,projects}:Props){
 const [category,setCategory]=useState('All Projects');
 const visible=useMemo(()=>category==='All Projects'?projects:projects.filter(p=>p.status===category),[projects,category]);
 return <main id="main" className="projects-page">
 <PageHero eyebrow={intro.eyebrow} heading={[intro.heading]} support={intro.support}/>
 <section className="container projects-page-body" aria-label="All projects">
 <Tabs value={category} onValueChange={setCategory} className="project-tabs"><TabsList variant="line" aria-label="Filter projects" className="project-filter-list projects-page-filter">{categories.map(item=><TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}</TabsList>
 <TabsContent value={category}><p className="sr-only" role="status">{visible.length} {visible.length===1?'project':'projects'} shown.</p><div className="projects-page-grid">{visible.map(project=><article className="project-card projects-grid-card" key={project.id}><ResponsiveImage name={project.image} alt={project.imageAlt} sizes="(max-width: 600px) 100vw, (max-width: 899px) 46vw, 31vw"/><div className="project-card-body"><h3>{project.name}</h3><p>{project.detail}</p><p className="project-status">{project.status}</p><Button asChild className="datla-button outline-button"><Link href={'/projects/'+project.id} aria-label={'View details for '+project.name}>View Details</Link></Button></div></article>)}</div>
 {visible.length===0&&<p className="projects-empty">No projects in this category yet.</p>}
 </TabsContent></Tabs>
 </section>
 </main>;
}
