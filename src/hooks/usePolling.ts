import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const usePolling = (ms: number = 60_000, searchParam: string | null) => {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval running");
      if (!searchParam) {
        console.log("refreshing data");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);
  }, [ms, router, searchParam]);
};
