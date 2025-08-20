import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFilteredData(endpoint, type ,page, sort,setLoading) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      if (endpoint === 'hebergement') {
        try {
          const query = searchParams.toString();
          console.log(sort);
          let url = '';
          if (sort.length === 0) {
            url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
              page * 6
            },${page * 6 + 5}]&status=libre`;
          } else {
            url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
              page * 6
            },${page * 6 + 5}]&status=libre&sort=${JSON.stringify(sort)}`;
          }
          const response = await axios.get(url);
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else if (endpoint === "voyage"){
        try {
          const query = searchParams.toString();
          console.log(sort);
          let url = '';
          if (sort.length === 0) {
            url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
              page * 3
            },${page * 3 + 2}]&status=valable&type=${type}`;
          } else {
            url = `http://localhost:5000/api/${endpoint}?${query}&range=[${
              page * 3
            },${page * 3 + 2}]&status=valable&sort=${JSON.stringify(sort)}`;
          }
          console.log(url);
          const response = await axios.get(url);
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData();
  }, [searchParams.toString(), page, sort]);
  return data;
}

export default useFilteredData;


