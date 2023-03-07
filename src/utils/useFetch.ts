import { useState, useEffect } from "react";
import axios from "axios";

// Data in the state that also will be returned
type Data = {
  loading: boolean;
  data: unknown | null;
  error: Error | null;
};

/**
 * Hook that handles fetching data
 * @param url The resource we are trying to fetch
 * @param transformer A function that converts the API result to desired type
 * @returns The transformed API result as the `data` value if successful. If
 * unsuccessful the error will also be returned as the `error` value. A `loading`
 * values shows the loading state of the fetch
 */
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
