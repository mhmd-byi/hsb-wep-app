"use client";

import { Notifications, Person3 } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  return (
    <div class="hidden md:flex flex-col w-fit bg-gray-800">
      <div class="flex flex-col flex-1 overflow-y-auto">
        <nav class="flex-1 px-2 py-4 bg-gray-800">
          <span class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700" onClick={() => router.push('/subscription')}>
            <Person3 className="mr-2" />
            HSB Members
          </span>
          <span class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
            <Notifications className="mr-2" />
            HSB Member subscription
          </span>
        </nav>
      </div>
    </div>
  );
}
