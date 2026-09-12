import {Building2,Users,Landmark,Award} from 'lucide-react';
const metricIcons={building:Building2,families:Users,construction:Landmark,award:Award};
type Metric={icon:string;value:string;label:string};
export function StatStrip({metrics}:{metrics:Metric[]}){
 return <section className="home-statistics" aria-label="Datla Infra at a glance"><div className="container metric-grid">{metrics.map(metric=>{const Icon=metricIcons[metric.icon as keyof typeof metricIcons];return <div className="metric" key={metric.label}><div><Icon aria-hidden="true"/><span>{metric.value}</span></div><p>{metric.label}</p></div>})}</div></section>;
}
