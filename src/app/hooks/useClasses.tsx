import { getClasses } from "@/services/classes.services";
import { useQuery } from "@tanstack/react-query";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
}
