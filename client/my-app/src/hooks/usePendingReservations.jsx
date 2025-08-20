import { useEffect, useState } from "react";
import axios from "axios";

const usePendingReservations = () => {
  const [recentReservations, setReservations] = useState([]);
  const [isloading, setLoading] = useState(true);

  const fetchPendingReservations = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/reservations?status=en%20attente&sort=desc&number=5"
      );
      setReservations(Array.isArray(data) ? data : data.reservations || []);
    } catch (err) {
      console.error("Erreur récupération réservations en attente:", err);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReservations();
  }, []);

  return { recentReservations, isloading, refetch: fetchPendingReservations };
};

export default usePendingReservations;
