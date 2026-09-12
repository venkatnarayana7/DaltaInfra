import {ContactPage} from '@/components/datla/contact-page';
import {getContactContent} from '@/lib/contact-content';
export default async function Contact(){const content=await getContactContent();return <ContactPage heading={content.heading} support={content.support} address={content.address} phone={content.phone} email={content.email} projectOptions={content.projectOptions}/>;}
