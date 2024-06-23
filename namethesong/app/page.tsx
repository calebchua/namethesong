import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <Link href="/creategame" className="text-7xl font-bold">Create Game</Link>
      </div>
    </main>
  );
}
