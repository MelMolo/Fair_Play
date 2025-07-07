import { useEffect } from "react";
import Button from "../buttons";
import { FaSadTear } from "react-icons/fa";

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void | Promise<void>;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex w-full min-h-screen flex-col gap-2 items-center justify-center">
      <h2 className="text-center flex flex-col gap-4 items-center justify-center">
        <FaSadTear />
        <span className="text-[#adb5bd] text-[16px] font-[500] font-poppins;">
          {"Something went wrong!"}
        </span>
      </h2>
      <Button
        className="mt-2"
        onClick={
          // Attempt to recover by trying to re-render the  route
          () => reset()
        }
      >
        Try again
      </Button>
    </main>
  );
}
