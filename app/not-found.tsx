import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex  justify-center items-center flex-col gap-5">
      <h2 className="font-bold text-5xl ">404</h2>
      <p className="text-center">
        Could not find the page you were looking for.
      </p>
      <Link
        href="/"
        className="bg-white border font-medium border-white text-black rounded-lg duration-200 p-2 hover:bg-gray-200 "
      >
        Return to Homepage
      </Link>
    </div>
  );
}
