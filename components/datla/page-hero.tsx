type Props={eyebrow:string;heading:string[];support:string;children?:React.ReactNode};
export function PageHero({eyebrow,heading,support,children}:Props){
 return <section className="page-hero" aria-labelledby="page-hero-heading"><div className="container"><p className="eyebrow">{eyebrow}</p><h1 id="page-hero-heading">{heading.map(line=><span key={line}>{line}</span>)}</h1><div className="gold-rule"/><p>{support}</p>{children}</div></section>;
}
