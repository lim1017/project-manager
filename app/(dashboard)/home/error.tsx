"use client"; // Error components must be Client components

import Button from "@/components/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className="text-3xl mb-6">Something went wrong!</h1>
      <h2>{error.message}</h2>
      <Button
        className="mt-3"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Back to safety
      </Button>
    </div>
  );
}
