import type {AnchorHTMLAttributes} from 'react';
type Props=AnchorHTMLAttributes<HTMLAnchorElement>&{href:string};
// Plain <a> in place of next/link's <Link>: this vinext (1.0.0-beta.5) build's client-side
// soft-navigation crashes on click in production (navigateClientSide comes back undefined
// from its dynamic import chunk -- a framework bug, not app code). Every route here already
// renders correctly on a full page load, so a native anchor sidesteps the broken JS entirely
// and restores working navigation. Revisit once vinext ships a fix without the build-hang
// regression seen when upgrading past beta.5.
export default function Link({href,...props}:Props){return <a href={href} {...props}/>;}
