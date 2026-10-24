import ProjectDetail from "./project-detail";
import ManagedProjectDetail from "./managed-project-detail";
import { projectOrder } from "../data";
export function generateStaticParams(){return projectOrder.map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ManagedProjectDetail slug={slug}/>}
