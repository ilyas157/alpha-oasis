import React, { useState, useEffect, useRef } from 'react';

const icon = {
  desc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-down-wide-narrow-icon lucide-arrow-down-wide-narrow"
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M11 4h10" />
      <path d="M11 8h7" />
      <path d="M11 12h4" />
    </svg>
  ),
  asc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-up-narrow-wide-icon lucide-arrow-up-narrow-wide"
    >
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
      <path d="M11 12h4" />
      <path d="M11 16h7" />
      <path d="M11 20h10" />
    </svg>
  ),
};
const Trier = ({ sort, setSort, setPage }) => {
  const [drop, setDrop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={containerRef} className=" flex gap-3 mr-5 lg:mr-15">
      {sort.length !== 0 && (
        <button
          className="btn btn-shadow rounded-full p-2"
          onClick={() => {
            setSort([]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
      <button
        className="btn btn-ghost text-xl py-2 px-10 border-2 border-black"
        onClick={() => {
          setDrop((prev) => !prev);
        }}
      >
        {sort[1] === undefined ? '' : sort[1] === 'ASC' ? icon.asc : icon.desc}
        <p className="hidden md:block">
          Trier par {sort[0] === 'prix_basique' ? 'prix' : sort[0]}
              </p>
              <p className='block lg:hidden'>
                  {sort.length===0? "Trier par":""}
              </p>
      </button>
      {drop && (
        <div className=" absolute flex flex-col bg-gray-50 z-20 rounded-2xl  top-70 max-sm:right-4 md:right-2  xl:right-60 ">
          <button
            className="btn btn-shadow  py-2 px-10 rounded-none rounded-t-2xl"
            onClick={() => {
              setSort(['prix_basique', 'ASC']);
              setDrop((prev) => !prev);
              setPage(0);
            }}
          >
            par prix ascendant
          </button>
          <button
            className="btn btn-shadow  py-2 px-10 rounded-none"
            onClick={() => {
              setSort(['prix_basique', 'DESC']);
              setDrop((prev) => !prev);
              setPage(0);
            }}
          >
            par prix descendant
          </button>
          <button
            className="btn btn-shadow  py-2 px-10 rounded-none"
            onClick={() => {
              setSort(['note', 'ASC']);
              setDrop((prev) => !prev);
              setPage(0);
            }}
          >
            par note ascendant
          </button>
          <button
            className="btn btn-shadow  py-2 px-10 rounded-none rounded-b-2xl"
            onClick={() => {
              setSort(['note', 'DESC']);
              setDrop((prev) => !prev);
              setPage(0);
            }}
          >
            par note descendant
          </button>
        </div>
      )}
    </div>
  );
};

export default Trier;
