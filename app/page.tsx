"use client";

import dynamic from 'next/dynamic';

const StoryPointEstimator = dynamic(
  () => import('../components/StoryPointEstimator').then(mod => ({ default: mod.StoryPointEstimator })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Story Point Estimation Tool</h1>
      <StoryPointEstimator />
    </main>
  );
}