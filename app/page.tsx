import FutureDateSelector from "@/components/Calendar";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recurring Date Picker</h1>
      <div className="flex flex-col space-y-6">
        <FutureDateSelector />
      </div>
    </div>
  );
}
