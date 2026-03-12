"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";

interface Class {
  id: number;
  student_id: number;
  date: string;
  status: string;
  cancellation_reason: string | null;
  students: {
    name: string;
  };
}

interface ClassesContextType {
  classes: Class[];
  loading: boolean;
  error: string | null;
  fetchClasses: () => Promise<void>;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("id, date, status, cancellation_reason, student_id, students(name)");
      console.log("Supabase classes data:", data); // Add this line
      console.log("Supabase classes error:", error); // Add this line
      if (error) {
        throw error;
      }
      setClasses(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching classes in context:", err); // Add this line
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    console.log("ClassesContext mounted, fetching classes..." + classes); // Add this line
  }, []);

  return (
    <ClassesContext.Provider value={{ classes, loading, error, fetchClasses }}>
      {children}
    </ClassesContext.Provider>
  );
}

export function useClasses() {
  const context = useContext(ClassesContext);
  if (context === undefined) {
    throw new Error("useClasses must be used within a ClassesProvider");
  }
  return context;
}
