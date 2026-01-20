"use client";

import { startTransition, use, useOptimistic, ViewTransition } from "react";
import type { Data } from "@/types/data-types";
import DeleteDataButton from "./buttons/delete-data-button";
import AddDataForm from "./forms/add-data-form";

type OptimisticAction =
  | { type: "add"; item: Data }
  | { type: "remove"; id: number };

export default function DataDisplay({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  const data = use(dataPromise);

  const [optimisticData, updateOptimistic] = useOptimistic(
    data,
    (state: Data[], action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.item];
        case "remove":
          return state.filter((item) => item.id !== action.id);
        default:
          return state;
      }
    }
  );

  return (
    <div className="flex flex-col border rounded-sm gap-4 p-8">
      {optimisticData.map((item) => (
        <ViewTransition key={item.id}>
          <h1 className="text-lg rounded-sm border p-8 flex justify-between">
            {item.data}
            <DeleteDataButton
              id={item.id}
              onDelete={() =>
                startTransition(() => {
                  updateOptimistic({ type: "remove", id: item.id });
                })
              }
            />
          </h1>
        </ViewTransition>
      ))}

      <AddDataForm
        onAdd={(value) =>
          startTransition(() => {
            updateOptimistic({
              type: "add",
              item: {
                id: Date.now(), // temporary optimistic id
                data: value,
              },
            });
          })
        }
      />
    </div>
  );
}
