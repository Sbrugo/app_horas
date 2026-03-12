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
  student_name: string;
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
      const { data: classesData, error: classesError } = await supabase
        .from("classes")
        .select("*");

      if (classesError) {
        throw classesError;
      }

      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("id, name");

      if (studentsError) {
        throw studentsError;
      }

      const studentsMap = new Map(
        studentsData.map((student) => [student.id, student.name]),
      );

      const combinedData = classesData.map((c) => ({
        ...c,
        student_name: studentsMap.get(c.student_id) || "Unknown",
      }));

      setClasses(combinedData || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching data in context:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
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
