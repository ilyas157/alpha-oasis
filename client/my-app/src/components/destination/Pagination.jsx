import { useState } from 'react';

const Pagination = ({ changePage, currentPage, numOfPages }) => {
  return (
    <>
      <div className="self-center w-full flex justify-center  my-5 ">
        <div className="join">
          {Array.from({ length: numOfPages }, (_, i) => (
            <input
              key={i}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={`${i + 1}`}
              value={i}
              onClick={changePage}
              checked={currentPage=== i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pagination;
