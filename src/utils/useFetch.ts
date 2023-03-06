import { useState, useEffect } from "react";
import axios from "axios";

type Data = {
  loading: boolean;
  data: unknown | null;
  error: Error | null;
};

export default function useFetch<T, K>(
  url: string,
  transformer: (responseData: T[]) => K[]
): Data & { data: K[] | null } {
  const [data, setData] = useState<Data & { data: K[] | null }>({
    loading: true,
    data: null,
    error: null,
  });

  async function getData() {
    try {
      const { data } = await axios.get<T[]>(url);
      const transformedData = transformer(data);
      setData({ loading: false, data: transformedData, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setData({ loading: false, data: null, error });
      }
    }
  }

  useEffect(() => {
    getData();
  }, [url]);

  return data;
}
