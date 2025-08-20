// hooks/useGetDataById.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetHebergementById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No ID provided');
      setLoading(false);
      return;
    }

    let isMounted = true; // prevent updates after unmount
    setLoading(true);
    setError(null);
    setData(null);

    axios
      .get(`http://localhost:5000/api/hebergement/${id}`)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.response?.data?.error || err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading, error };
};

export default useGetHebergementById;
