'use client';
import {useCallback,useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft,ChevronRight} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Button} from '@/components/ui/button';
import {ResponsiveImage} from './responsive-image';
import type {ProjectSummary} from '@/lib/home-content';
const categories=['All Projects','Completed','Under Construction','Upcoming'];
export function ProjectsSection({projects}:{projects:ProjectSummary[]}){
 const [category,setCategory]=useState('All Projects');
 const visible=useMemo(()=>category==='All Projects'?projects:projects.filter(p=>p.status===category),[projects,category]);
 const [viewport,api]=useEmblaCarousel({align:'start',containScroll:'trimSnaps',loop:false});
 const [current,setCurrent]=useState(0);const [previous,setPrevious]=useState(false);const [next,setNext]=useState(false);
 const update=useCallback(()=>{if(!api)return;setCurrent(api.selectedScrollSnap());setPrevious(api.canScrollPrev());setNext(api.canScrollNext());},[api]);
 useEffect(()=>{if(!api)return;api.on('select',update);api.on('reInit',update);update();return()=>{api.off('select',update);api.off('reInit',update)}},[api,update]);
 useEffect(()=>{if(api){api.reInit();api.scrollTo(0,true);update()}},[api,category,update]);
 return <section className="home-projects container" id="projects" aria-labelledby="projects-heading">
 <div className="home-section-heading"><h2 id="projects-heading">Our Projects</h2><div className="project-navigation" aria-label="Project carousel controls"><Button variant="ghost" className="circle-control" aria-label="Previous project" onClick={()=>api?.scrollPrev()} disabled={!previous}><ChevronLeft/></Button><Button variant="ghost" className="circle-control" aria-label="Next project" onClick={()=>api?.scrollNext()} disabled={!next}><ChevronRight/></Button></div></div>
 <Tabs value={category} onValueChange={setCategory} className="project-tabs"><TabsList variant="line" aria-label="Filter projects" className="project-filter-list">{categories.map(item=><TabsTrigger key={item} value={item}>{item}</TabsTrigger>)}</TabsList>
 <TabsContent value={category} className="project-results"><p className="sr-only" role="status">{visible.length} {visible.length===1?'project':'projects'} shown.</p><div className="project-viewport" ref={viewport}><div className="project-track">{visible.map(project=><div className="project-slide" key={project.id}><article className="project-card home-project-card"><ResponsiveImage name={project.image} alt={project.imageAlt} sizes="(max-width: 600px) 85vw, (max-width: 899px) 46vw, 31vw"/><div className="project-card-body"><h3>{project.name}</h3><p>{project.detail}</p><p className="project-status">{project.status}</p><Button asChild className="datla-button outline-button"><Link href="/projects" aria-label={'View details for '+project.name}>View Details</Link></Button></div></article></div>)}</div></div>
 {visible.length>1&&<p className="project-position" aria-live="polite"><span>{String(current+1).padStart(2,'0')}</span> / {String(visible.length).padStart(2,'0')}<span className="swipe-hint">Swipe to explore</span></p>}</TabsContent></Tabs>
 <div className="all-projects"><Button asChild className="datla-button"><Link href="/projects">View All Projects</Link></Button></div>
 </section>;
}
