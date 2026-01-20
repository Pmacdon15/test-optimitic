"use server";

import { neon } from "@neondatabase/serverless";
import { updateTag } from "next/cache";
import type { Data } from "@/types/data-types";

export async function addData(value: string): Promise<Data> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const sql = neon(String(process.env.DATABASE_URL));

  try {
    const [row] = (await sql`
      INSERT INTO data (data)
      VALUES (${value})
      RETURNING id, data;
    `) as Data[];
    updateTag("data");
    return row;
  } catch (error) {
    console.error("Failed to insert data:", error);
    throw error;
  }
}

// Delete data by ID
export async function deleteData(id: number): Promise<Data | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const sql = neon(String(process.env.DATABASE_URL));

  try {
    const [row] = (await sql`
      DELETE FROM data
      WHERE id = ${id}
      RETURNING id, data;
    `) as Data[];

    updateTag("data");
    // If no row was deleted, return null
    return row ?? null;
  } catch (error) {
    console.error("Failed to delete data:", error);
    throw error;
  }
}
