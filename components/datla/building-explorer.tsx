'use client';
import {useState} from 'react';
import Link from '@/components/datla/link';
import {ArrowLeft,MapPin} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {BuildingExplorer as BuildingExplorerData} from '@/lib/explorer-content';
type Props={projectName:string;projectSlug:string;data:BuildingExplorerData};
export function BuildingExplorer({projectName,projectSlug,data}:Props){
 const [floorId,setFloorId]=useState<string|null>(null);
 const [flatNo,setFlatNo]=useState<string|null>(null);
 const selectedFloor=data.floors.find(f=>f.id===floorId)??null;
 const selectedFlat=flatNo?data.flats[flatNo]:null;
 function selectFloor(id:string){setFloorId(id);setFlatNo(null);}
 return <main id="main" className="explorer-page">
 <div className="container explorer-topbar">
 <Button asChild variant="ghost" className="explorer-back"><Link href={'/projects/'+projectSlug}><ArrowLeft aria-hidden="true"/> Back to Project</Link></Button>
 <p className="eyebrow">DATLA INFRA · BUILDING EXPLORER</p>
 <h1>{projectName}</h1>
 <p className="explorer-disclaimer">An interactive architectural schematic — floor and unit layout, not a photorealistic 3D render.</p>
 </div>
 <div className="container explorer-layout">
 <nav className="floor-selector" aria-label="Select a floor">
 {data.hasTerrace&&<span className="floor-btn terrace-label" aria-hidden="true">Terrace</span>}
 {data.floors.map(floor=><button key={floor.id} type="button" className={'floor-btn'+(floorId===floor.id?' active':'')} aria-pressed={floorId===floor.id} onClick={()=>selectFloor(floor.id)}>{floor.label}</button>)}
 </nav>
 <div className="building-elevation" aria-hidden="true">
 {data.hasTerrace&&<div className="elevation-row terrace-row"/>}
 {data.floors.map(floor=><div key={floor.id} className={'elevation-row'+(floorId===null?'':floorId===floor.id?' is-active':' is-dim')}/>)}
 </div>
 <div className="floor-panel">
 {selectedFloor?<>
 <div className="floor-panel-heading"><h2>{selectedFloor.label} — Flats</h2><ul className="explorer-legend"><li><span className="status-dot available"/>Available</li><li><span className="status-dot occupied"/>Occupied</li><li><span className="status-dot booked"/>Booked</li></ul></div>
 <div className="flat-grid">{selectedFloor.flats.map(num=>{const flat=data.flats[num];return <button key={num} type="button" className={'flat-tile status-'+flat.status+(flatNo===num?' selected':'')} aria-pressed={flatNo===num} onClick={()=>setFlatNo(num)}>{num}</button>})}</div>
 {selectedFlat&&<div className="flat-detail-panel"><p className="eyebrow">{selectedFloor.label} · Flat {flatNo}</p><h3>Flat {flatNo}</h3><p className="flat-bhk">{selectedFlat.bhk}</p><dl>
 <div><dt>Status</dt><dd className={'status-pill status-'+selectedFlat.status}>{selectedFlat.status}</dd></div>
 {selectedFlat.owner&&<div><dt><MapPin aria-hidden="true"/>Owner</dt><dd>{selectedFlat.owner}</dd></div>}
 {selectedFlat.purchasedOn&&<div><dt>Purchased On</dt><dd>{selectedFlat.purchasedOn}</dd></div>}
 </dl>
 <div className="flat-detail-actions">
 <Button variant="ghost" className="datla-button outline-button" onClick={()=>setFlatNo(null)}>Back to Floor</Button>
 <Button variant="ghost" className="datla-button outline-button" onClick={()=>{setFloorId(null);setFlatNo(null);}}>Back to Building</Button>
 <Button asChild className="datla-button"><Link href="/contact">Enquire About This Flat</Link></Button>
 </div>
 </div>}
 </>:<p className="explorer-hint">Select a floor on the left to view its flats.</p>}
 </div>
 </div>
 </main>;
}
