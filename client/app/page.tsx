'use client';

import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/game/PhaserGame'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-900">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tighter uppercase">
          Chaos Kingdom
        </h1>
        <div className="rounded-xl overflow-hidden border-4 border-slate-700 shadow-2xl shadow-blue-500/20">
          <PhaserGame />
        </div>
        <div className="mt-8 text-slate-400 text-center">
          <p>Use Arrow Keys to move • Space to Jump</p>
          <p className="text-xs mt-2 uppercase tracking-widest text-slate-500 font-sans">Multiplayer Alpha v0.1</p>
        </div>
      </div>
    </main>
  );
}
