import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton () {
  return (
    <div className="h-[26rem] rounded-lg shadow-xl w-64 flex items-center flex-col">
      <Skeleton height={256} width={240} className="rounded-md" />
      <Skeleton height={24} width={220} className="mt-1 px-2 h-12" />
      <div className="flex font-bold mt-1">
        <Skeleton height={24} width={70} className="mr-2" />
        <Skeleton height={24} width={70} className="line-through" />
        <Skeleton height={24} width={50} className="ml-1" />
      </div>
      <div className="border-t-2 border-grey my-4 w-64"></div>
      <div className="flex justify-around w-64 items-center">
        <Skeleton height={40} width={32} />
        <Skeleton height={40} width={100} className="rounded-md" />
      </div>
    </div>
  );
}

export default CardSkeleton;