import Image from "next/image";
import { Logout } from "@mui/icons-material";

export default function Header() {
  
  return (
    <header className="bg-theme-color py-4 px-5 flex justify-between items-center">
      <Image src="/hsb-logo.png" width={150} height={30} alt="logo"/>
      <button className="flex text-white"><Logout />Logout</button>
    </header>
  );
}
