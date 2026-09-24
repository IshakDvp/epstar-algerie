import {notFound} from "next/navigation";
import ProductDetail from "./product-detail";
import {catalog} from "../data";

export function generateStaticParams(){return catalog.map(p=>({slug:p.slug}))}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=catalog.find(p=>p.slug===slug);if(!product)notFound();return <ProductDetail product={product}/>}
