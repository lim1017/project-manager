import Card from "@/components/Card";
import { Spinner } from "@/components/Spinner";

export default function HomePageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="">
        <Spinner />
      </Card>
    </div>
  );
}
