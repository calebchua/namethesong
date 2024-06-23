import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-screen flex justify-center items-center">
        <Link href="/creategame" className="text-7xl font-bold">Create Game</Link>
      </div>
    </main>
  );
}
