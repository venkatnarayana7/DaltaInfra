'use client';
import {useState} from 'react';
import {MapPin,Phone,Mail,CircleCheck} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {NativeSelect,NativeSelectOption} from '@/components/ui/native-select';
import {PageHero} from './page-hero';
type Props={heading:string;support:string;address:string;phone:string;email:string;projectOptions:string[]};
export function ContactPage({heading,support,address,phone,email,projectOptions}:Props){
 const [submitted,setSubmitted]=useState(false);
 function handleSubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  event.currentTarget.reset();
  setSubmitted(true);
 }
 return <main id="main" className="contact-page">
 <PageHero eyebrow="DATLA INFRA · CONTACT" heading={[heading]} support={support}/>
 <section className="container contact-layout">
 <div>
 <ul className="contact-info-list">
 <li className="contact-info-item"><MapPin aria-hidden="true"/><span>{address}</span></li>
 <li className="contact-info-item"><a href={'tel:'+phone.replace(/\s+/g,'')}><Phone aria-hidden="true"/><span>{phone}</span></a></li>
 <li className="contact-info-item"><a href={'mailto:'+email}><Mail aria-hidden="true"/><span>{email}</span></a></li>
 </ul>
 <div className="contact-map" role="img" aria-label={'Map placeholder for '+address}><MapPin aria-hidden="true"/><span>{address}</span><small>Interactive map coming soon</small></div>
 </div>
 <form className="contact-form" onSubmit={handleSubmit}>
 <div className="form-row">
 <div className="form-field"><label htmlFor="contact-name">Name</label><Input id="contact-name" name="name" required autoComplete="name"/></div>
 <div className="form-field"><label htmlFor="contact-phone">Phone</label><Input id="contact-phone" name="phone" type="tel" required autoComplete="tel"/></div>
 </div>
 <div className="form-row">
 <div className="form-field"><label htmlFor="contact-email">Email</label><Input id="contact-email" name="email" type="email" required autoComplete="email"/></div>
 <div className="form-field"><label htmlFor="contact-project">Interested Project</label><NativeSelect id="contact-project" name="project" defaultValue={projectOptions[0]}>{projectOptions.map(option=><NativeSelectOption key={option} value={option}>{option}</NativeSelectOption>)}</NativeSelect></div>
 </div>
 <div className="form-field"><label htmlFor="contact-message">Message</label><Textarea id="contact-message" name="message" rows={4}/></div>
 <Button type="submit" className="datla-button">Send Enquiry</Button>
 {submitted&&<p className="contact-confirm" role="status"><CircleCheck aria-hidden="true"/> Thanks for reaching out — enquiry submissions will be enabled once Firebase is connected in a later phase.</p>}
 </form>
 </section>
 </main>;
}
