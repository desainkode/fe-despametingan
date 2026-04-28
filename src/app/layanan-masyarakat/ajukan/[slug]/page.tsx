import React from "react";
import { SubmissionForm } from "@/features/layanan/components/SubmissionForm";

export default async function AjukanLayananPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <main className="min-h-screen bg-[#F6F8F7] pt-24 pb-20">
      <SubmissionForm serviceSlug={slug} />
    </main>
  );
}
