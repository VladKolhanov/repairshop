import Image from "next/image";
import Link from "next/link";

import { Networking } from "@/configs/networking";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found-1024x1024.png"
          width={300}
          height={300}
          alt="Alt Not Found"
          sizes="300px"
          priority={true}
          title="Page Not Found"
        />
      </div>
      <Link href={Networking.TICKETS} className="text-center hover:underline">
        <h3>Go Home</h3>
      </Link>
    </div>
  );
}
