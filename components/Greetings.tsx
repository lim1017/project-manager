import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Card from "./Card";
import SettingsComponent from "./SettingsComponent";
import Providers from "@/lib/providers/Provider";

const getData = async () => {
  const user = await getUserFromCookie(cookies());

  return user;
};

const Greetings = async () => {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <h1 className="text-3xl text-gray-700 font-bold mb-4">
            Hello, {user?.firstName}!
          </h1>
          <h4 className="text-xl text-gray-400">Check your projects & tasks</h4>
        </div>
        <Providers>
          <SettingsComponent />
        </Providers>
      </div>
    </Card>
  );
};

export default Greetings;
