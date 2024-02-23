import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(url);
        setLoading(false);
        setData(result.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
