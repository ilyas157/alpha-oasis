import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function useVoyageBasic(page, sort, setLoading) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = searchParams.toString();
        let url = '';

        if (!sort || sort.length === 0) {
          url = `http://localhost:5000/api/voyage/admin?range=[${page * 5},${page * 5 + 4}]`;
        } else {
          url = `http://localhost:5000/api/voyage/admin?${query}&range=[${page * 5},${page * 5 + 4}]&sort=${JSON.stringify(sort)}`;
        }

        console.log('Fetching voyage basic data:', url);
        const response = await axios.get(url);

        setData(response.data); // your route already returns { voyages, total }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching voyage basic data:', error);
        setLoading(false);
      }
    };

    getData();
  }, [searchParams.toString(), page, sort]);

  return data;
}

export default useVoyageBasic;
