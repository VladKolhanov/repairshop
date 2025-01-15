import Link from "next/link";

import { FileIcon, HomeIcon, UsersRoundIcon } from "@/icons";
import { NavButton } from "@/components/NavButton";
import { Networking } from "@/config/networking";
import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href={Networking.HOME} label="Home" icon={HomeIcon} />
          <Link
            href={Networking.HOME}
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton
            href={Networking.TICKETS}
            label="Tickets"
            icon={FileIcon}
          />
          <NavButton
            href={Networking.CUSTOMERS}
            label="Customers"
            icon={UsersRoundIcon}
          />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
