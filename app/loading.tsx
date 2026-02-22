export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-black">
      <p className="text-4xl font-bold text-neon">PAGODINHO DO FERA</p>
      <div className="h-1 w-56 overflow-hidden rounded bg-zinc-800">
        <div className="h-full w-1/2 animate-pulse bg-neon" />
      </div>
    </div>
  );
}
