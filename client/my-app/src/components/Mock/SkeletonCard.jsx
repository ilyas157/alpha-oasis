import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex w-xs rounded-2xl shadow-2xl  h-[530px] flex-col gap-4">
      <div className="skeleton rounded-t-2xl h-[200px] w-full"></div>
      <div className="flex flex-col p-5 gap-5">
        <div className="rounded-2xl skeleton p-5 h-4 w-28"></div>
        <div className=" rounded-2xl skeleton h-4 w-60"></div>
        <div className="rounded-2xl skeleton h-4 w-full"></div>
        <div className="rounded-2xl skeleton h-4 w-40"></div>
        <div className="rounded-2xl skeleton p-3 w-33 h-4"></div>
        <div className="rounded-2xl p-5 skeleton h-4 w-36"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
