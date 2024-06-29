import Link from "next/link";
import { HiMusicNote } from "react-icons/hi";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-screen flex flex-col items-center">
        <div className="flex justify-center items-center space-x-6 mt-20 mb-32">
          <HiMusicNote className="text-9xl" />
          <div className="text-7xl font-bold">Name the Song</div>
        </div>
        <Link href="/creategame" className="text-7xl bg-white font-bold text-primary border-4 border-white rounded-2xl px-8 py-6">Create Game</Link>
      </div>
    </main>
  );
}
