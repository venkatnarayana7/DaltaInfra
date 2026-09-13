import Link from '@/components/datla/link';
import {Button} from '@/components/ui/button';
import {ResponsiveImage} from './responsive-image';
type Props={heading:string;description:string;image:string};
export function CtaBand({heading,description,image}:Props){
 return <section className="home-cta" aria-labelledby="cta-band-heading"><ResponsiveImage name={image} wide alt="" sizes="100vw" className="cta-picture"/><div className="container cta-copy"><h2 id="cta-band-heading">{heading}</h2><p>{description}</p><Button asChild className="datla-button"><Link href="/contact">Contact Us</Link></Button></div></section>;
}
