import { Inter } from "next/font/google";
import Header from "../common/header";
import Sidebar from "../common/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HSB Indore Web App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 max-h-full">{children}</main>
      </div>
    </div>
  );
}
