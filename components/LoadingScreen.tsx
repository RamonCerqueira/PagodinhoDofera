export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo-wrap">
        <p className="loading-logo">PAGODINHO DO FERA</p>
        <div className="loading-glow" />
      </div>

      <div className="loading-eq" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="loading-eq-bar" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>

      <p className="loading-phrase">♪ Energia ao vivo • samba no pé • festa garantida ♪</p>

      <div className="loading-track" aria-hidden>
        <div className="loading-progress" />
      </div>
    </div>
  );
}
