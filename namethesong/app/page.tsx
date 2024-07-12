import Link from "next/link";
import { HiMusicNote } from "react-icons/hi";

export default function Home() {
  return (
    <main>
      <div className="w-screen h-screen flex flex-col items-center">
        <div className="flex justify-center items-center sm:space-x-6 space-x-4 sm:mt-20 mt-36 sm:mb-32 mb-12">
          <HiMusicNote className="sm:text-9xl text-6xl" />
          <div className="sm:text-7xl text-4xl font-bold">Name the Song</div>
        </div>
        <Link href="/creategame" className="sm:text-7xl text-4xl bg-secondary font-bold text-primary border-4 border-secondary rounded-2xl px-8 py-6 active:bg-gray-200 active:border-gray-200"
        >
          Create Game
        </Link>
      </div>
    </main>
  );
}
