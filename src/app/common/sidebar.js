"use client";

import { Notifications, Person3 } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div class="hidden md:flex flex-col w-fit bg-gray-800">
      <div class="flex flex-col flex-1 overflow-y-auto">
        <nav class="flex flex-col px-2 py-4 bg-gray-800">
          <button onClick={() => router.push("/dashboard")}>
            <span class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
              <Person3 className="mr-2" />
              HSB Members
            </span>
          </button>
          <button onClick={() => router.push("/dashboard/subscription")}>
            <span class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <Notifications className="mr-2" />
              HSB Member subscription
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
