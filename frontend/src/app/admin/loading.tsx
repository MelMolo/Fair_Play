import RequestSpinner from "@/components/reusable/loaders/spinner";

export default function Loading() {
  return (
    <div className="background min-h-screen flex items-center justify-center">
      <div className="font-poppins w-full  text-2xl lg:text-3xl animate-pulse">
        <RequestSpinner />
      </div>
    </div>
  );
}
