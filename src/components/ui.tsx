'use client';

import { useState, useEffect, ReactNode } from 'react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 100 + delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
      {children}
    </div>
  );
}

export function GridBg() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute" style={{ top: '-30%', right: '-20%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(200,255,0,0.03) 0%, transparent 60%)', filter: 'blur(100px)' }} />
      <div className="absolute" style={{ bottom: '-20%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(200,255,0,0.02) 0%, transparent 60%)', filter: 'blur(80px)' }} />
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[rgba(255,255,255,0.04)] ${className}`} />;
}

export function LoadingTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
