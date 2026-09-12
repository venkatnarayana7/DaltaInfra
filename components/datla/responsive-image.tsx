type Props={name:string;alt:string;wide?:boolean;priority?:boolean;sizes?:string;className?:string};
// hero/interior only exist as 768/1536 assets; every other image only exists as 480/960. Auto-detect so callers can't request a size that was never generated.
const wideOnlyNames=new Set(['hero','interior']);
export function ResponsiveImage({name,alt,wide,priority=false,sizes='100vw',className}:Props){
 const isWide=wide??wideOnlyNames.has(name);
 const small=isWide?768:480;const large=isWide?1536:960;
 return <img className={className} src={'/images/'+name+'-'+small+'.webp'} srcSet={'/images/'+name+'-'+small+'.webp '+small+'w, /images/'+name+'-'+large+'.webp '+large+'w'} sizes={sizes} width={large} height={name==='garden'?Math.round(large*1.25):Math.round(large*2/3)} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}
