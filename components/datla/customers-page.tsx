import {getCustomersContent} from '@/lib/customers-content';
import {PageHero} from './page-hero';
import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@/components/ui/table';
function initials(name:string){return name.split(' ').map(part=>part[0]).slice(0,2).join('').toUpperCase();}
export async function CustomersPage(){
 const content=await getCustomersContent();
 return <main id="main" className="customers-page">
 <PageHero eyebrow="DATLA INFRA · CUSTOMERS" heading={[content.heading]} support={content.subtitle}/>
 <section className="container" aria-label="Customer records">
 <div className="customers-panel"><Table><TableHeader><TableRow><TableHead>Owner</TableHead><TableHead>Project</TableHead><TableHead>Flat No.</TableHead><TableHead>Purchased On</TableHead></TableRow></TableHeader><TableBody>{content.customers.map(customer=><TableRow key={customer.name+customer.flatNo}><TableCell><span className="customer-name-cell"><span className="customer-avatar" aria-hidden="true">{initials(customer.name)}</span>{customer.name}</span></TableCell><TableCell>{customer.project}</TableCell><TableCell>{customer.flatNo}</TableCell><TableCell>{customer.purchasedOn}</TableCell></TableRow>)}</TableBody></Table></div>
 <p className="customers-note">Demo records shown above. Live customer data will sync from Firestore in a later phase.</p>
 </section>
 </main>;
}
