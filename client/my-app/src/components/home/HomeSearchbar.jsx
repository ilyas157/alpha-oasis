import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSearchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    query: '',
    type: 'tout',
  });
  return (
    <>
      <form
        className="flex justify-center flex-wrap m-15 gap-5 md:gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(
            `/destinations?search=${encodeURIComponent(
              search.query.trim()
            )}&type=${encodeURIComponent(search.type)}&page=1`
          );
        }}
      >
        <input
          type="text"
          placeholder="Votre destination ici.."
          className="input "
          value={search.query}
          onChange={(e) =>
            setSearch((prev) => ({
              ...prev,
              query: e.target.value,
            }))
          }
        />
        <select
          value={search.type}
          onChange={(e) =>
            setSearch((prev) => {
              return {
                ...prev,
                type: e.target.value,
              };
            })
          }
          className="select select-bordered w-full max-w-xs "
        >
          <option value="tout">tout</option>
          <option value="omra_hajj">Omra Hajj</option>
          <option value="voyage">Voyage organisé</option>
          <option value="hotel">Hôtel</option>
        </select>

        <button type="submit" className="btn btn-primary">
          chercher
        </button>
      </form>
    </>
  );
};

export default HomeSearchbar;
