"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function page(error, reset) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center">
      <div className=" flex justify-center items-center flex-col gap-3 p-3 bg-black bg-opacity-20 md:w-1/2 w-4/5 rounded-md shadow-customShadow">
        <h1 className="text-3xl">404</h1>
        <h2 className="text-textLight text-xl">Something went wrong!</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
