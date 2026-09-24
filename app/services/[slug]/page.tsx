import { notFound } from "next/navigation";
import ServiceDetail from "./service-detail";

const slugs = ["pharmacies", "bureaux", "commerces", "chambres"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <ServiceDetail slug={slug} />;
}
