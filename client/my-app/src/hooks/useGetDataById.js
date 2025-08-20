// hooks/useGetDataById.js
import { useState, useEffect } from "react";
import axios from "axios";

const useGetDataById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No ID provided");
      setLoading(false);
      return;
    }

    let isMounted = true; // prevent updates after unmount
    setLoading(true);
    setError(null);
    setData(null);

    axios
      .get(`http://localhost:5000/api/voyage/${id}`)
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

export default useGetDataById;

















/*
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetDataById = (id) => {
  const [data, setData] = useState([]);
  const url = `http://localhost:5000/api/voyage/${id}`;
  console.log(url);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  console.log('this is data from axios', data);
  return data;
};

export default useGetDataById;

*/
