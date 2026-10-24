import {catalog,type Product} from "../data";
import ManagedProductDetail from "./managed-product-detail";

export function generateStaticParams(){return catalog.map(p=>({slug:p.slug}))}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product:Product|undefined=catalog.find(p=>p.slug===slug);return <ManagedProductDetail slug={slug}/>}
