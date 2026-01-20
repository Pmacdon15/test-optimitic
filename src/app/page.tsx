import { Suspense } from "react";
import DataDisplay from "@/componenets/data-display";
import { fetchData } from "../dal/dal";

export default async function Home() {
  const dataPromise = fetchData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-4">
      <Suspense>
        <DataDisplay dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
