import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-black text-white">
      <h1 className="text-2xl font-bold">Frontend Assignment</h1>
      <div className="flex gap-4">
        <Link href={`/assignment1`} className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition cursor-pointer">
          Assignment 1
        </Link>
        <Link href={`/assignment2`} className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition cursor-pointer">
          Assignment 2
        </Link>
      </div>
    </main>
  );
}
