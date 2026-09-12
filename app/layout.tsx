import type {Metadata} from 'next';
import './globals.css';
import './home.css';
import './pages.css';
import {Header,Footer} from '@/components/datla/shell';
export const metadata:Metadata={title:'DATLA INFRA | Building Trust. Creating Homes.',description:'Building Trust. Creating Homes. Building Futures. Datla Infra, Vijayawada.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
