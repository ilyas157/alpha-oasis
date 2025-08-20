import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFilteredHebergement(endpoint, page, sort, setLoading) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const query = searchParams.toString();
        console.log(sort);
        let url = '';
        if (sort.length === 0) {
          url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
            page * 5
          },${page * 5 + 4}]`;
        } else {
          url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
            page * 5
          },${page * 5 + 4}]&sort=${JSON.stringify(sort)}`;
        }
        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [searchParams.toString(), page, sort]);
  return data;
}

export default useFilteredHebergement;
