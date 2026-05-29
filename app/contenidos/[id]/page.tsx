import ContentDetailPage from "@/components/ContentDetailPage";

export default async function ContentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ContentDetailPage itemId={id} />;
}
