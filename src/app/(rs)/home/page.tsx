import { redirect } from "next/navigation";

import { Networking } from "@/configs/networking";

export default function Home() {
  redirect(Networking.TICKETS);
}
