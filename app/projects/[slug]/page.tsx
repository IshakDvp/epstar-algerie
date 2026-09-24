import { notFound } from "next/navigation";
import ProjectDetail from "./project-detail";
import { projectOrder } from "../data";
export function generateStaticParams(){return projectOrder.map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!projectOrder.includes(slug as typeof projectOrder[number]))notFound();return <ProjectDetail slug={slug as typeof projectOrder[number]}/>}
