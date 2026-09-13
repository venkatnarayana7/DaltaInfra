'use client';
import Link from '@/components/datla/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu,MapPin,Phone,Mail} from 'lucide-react';
import {Sheet,SheetContent,SheetTitle,SheetDescription,SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {navigation} from '@/lib/datla';
import {Brand} from './brand';
export function Header(){
const pathname=usePathname();const [open,setOpen]=useState(false);
return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="container header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined}>{item.label}</Link>)}</nav><Button asChild className="datla-button enquire"><Link href="/contact">Enquire Now</Link></Button><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" className="menu-button" aria-label="Open navigation"><Menu/></Button></SheetTrigger><SheetContent className="mobile-sheet"><SheetTitle>DATLA INFRA</SheetTitle><SheetDescription>Explore our company and communities.</SheetDescription><nav aria-label="Mobile navigation">{navigation.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined} onClick={()=>setOpen(false)}>{item.label}</Link>)}</nav></SheetContent></Sheet></div></header></>;
}
export function Footer(){return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><Brand/><p>Building Trust. Creating Homes.<br/>Building Futures.</p></div><div><h2>Quick Links</h2><nav aria-label="Footer navigation">{navigation.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div><div><h2>Projects</h2><nav aria-label="Our projects"><Link href="/projects">Subhadra Residency</Link><Link href="/projects">Sree Nivas Heights</Link><Link href="/projects">Datla Enclave</Link></nav></div><div className="footer-contact"><h2>Contact Us</h2><p><MapPin/>Vijayawada, Andhra Pradesh</p><a href="tel:+919876543210"><Phone/>+91 98765 43210</a><a href="mailto:info@datlainfra.com"><Mail/>info@datlainfra.com</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Datla Infra.</span><span>Building Trust. Creating Homes. Building Futures.</span></div></footer>}
