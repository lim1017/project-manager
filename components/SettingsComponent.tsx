"use client";
import Select from "./Select";
import { SortBy, setSortBy } from "@/store/settingsSlice";
import { store } from "@/store";
import { useAppSelector } from "./Projects";
import Button from "./Button";
import { signOut } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SettingsComponent() {
  const router = useRouter();

  const settingsData = useAppSelector((state) => state.settings);

  const handleSortChange = (e) => {
    store.dispatch(setSortBy(e.target.value));
  };

  const handleLogout = () => {
    signOut().then(() => {
      router.replace("/");
    });
  };

  return (
    <div className="flex flex-col">
      <Select
        name="Sort By"
        value={settingsData.sortBy}
        onChange={handleSortChange}
        options={[
          { value: SortBy.ASCENDING, label: "Ascending" },
          { value: SortBy.DESCENDING, label: "Decending" },
        ]}
      />
      <Button size="small" className="mt-3" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
