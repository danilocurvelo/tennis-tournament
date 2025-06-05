import Bracket from './components/Bracket';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Tennis Tournament</h1>
      <Bracket />
    </main>
  );
}
