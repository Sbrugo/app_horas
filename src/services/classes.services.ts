import { createClient } from "@/lib/supabase/client";

export async function getClasses() {
  const supabase = createClient();

  const { data, error } = await supabase.from("classes").select(`
      id,
      date,
      status,
      cancellation_reason,
      students (
        id,
        name
      )
    `);

  if (error) throw error;
  console.log("Clases obtenidas:", data);
  return data;
}
