import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-theme-color py-4 flex justify-center">
      <Image src="/hsb-logo.png" width={150} height={30} />
    </header>
  );
}
