import useSWR from "swr";
import { InstituteTeacherInterface } from "@/database/model/institute-teacher.model";

const fetcher = (url: string) => fetch(url).then(async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch data');
  }
  return res.json();
});

interface TeachersResponse {
  teachers: InstituteTeacherInterface[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}

export function useTeachers(page: number = 1, limit: number = 10, search?: string, status?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
  });

  const { data, error, isLoading, mutate } = useSWR<TeachersResponse>(
    `/api/institute/teachers?${params}`,
    fetcher
  );

  return {
    teachers: data?.teachers,
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  };
} 