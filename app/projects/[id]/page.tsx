export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[#0B0E12] text-[#E8EDF2] flex items-center justify-center font-mono tracking-widest uppercase">
      {params.id} ARCHIVE PENDING
    </main>
  );
}
