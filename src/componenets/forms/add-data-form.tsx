"use client";

import { addData } from "@/actions/data-actions";

export default function AddDataForm({
  onAdd,
}: {
  onAdd: (value: string) => void;
}) {
  return (
    <form
      action={async (formData: FormData) => {
        const value = formData.get("data");
        if (typeof value !== "string" || !value.trim()) return;

        onAdd(value);        // optimistic update
        await addData(value); // server action
      }}
      className="flex gap-2 items-center"
    >
      <input
        name="data"
        type="text"
        placeholder="Enter data..."
        className="border rounded-sm p-2"
        required
      />

      <button type="submit" className="p-2 border rounded-sm">
        Add Data
      </button>
    </form>
  );
}
