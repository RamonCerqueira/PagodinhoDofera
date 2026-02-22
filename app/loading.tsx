export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-logo-wrap">
        <p className="loading-logo">PAGODINHO DO FERA</p>
        <div className="loading-glow" />
      </div>

      <p className="loading-phrase">
        ♪ Energia ao vivo • samba no pé • festa garantida • Pagodinho do Fera ♪
      </p>

      <div className="loading-track" aria-hidden>
        <div className="loading-progress" />
      </div>
    </div>
  );
}
