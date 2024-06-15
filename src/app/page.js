"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [its, setIts] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!its) {
      toast.error("Please enter your ITS.");
      setLoader(false);
      return;
    }

    const res = await fetch(`/api/check-its/${its}`);
    const data = await res.json();

    if (!data.exists) {
      toast.error("ITS not found.");
      setLoader(false);
      return;
    }

    const loginRes = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ its, password }),
    });

    const loginData = await loginRes.json();

    if (loginData.error) {
      toast.error(loginData.error);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("userId", loginData.user._id);
      }
      router.push("/dashboard");
    }
    setLoader(false);
  };

  const handleInputChange = () => {
    toast.error("");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {loader && <Loader />}
      <div className="grid gap-8">
        <div className="border-[20px] border-transparent rounded-[20px] bg-theme-color shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
          <div className="flex flex-col justify-center items-center">
            <Image src="/hsb-logo.png" width={250} height={30} />
            <h1 className="pt-8 pb-6 font-bold text-white text-4xl text-center cursor-default">
              Log in
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                id="its"
                name="its"
                className="border p-3 bg-white text-theme-color shadow-md placeholder:text-base focus:scale-105 focus:border-theme-color ease-in-out duration-300 border-theme-color rounded-lg w-full"
                type="number"
                placeholder="Enter ITS Number"
                onChange={(e) => {
                  setIts(e.target.value);
                  handleInputChange();
                }}
                required
              />
            </div>
            <div>
              <input
                id="password"
                className="border p-3 shadow-md text-theme-color bg-white placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChange();
                }}
                required
              />
            </div>
            <a
              className="group text-white transition-all duration-100 ease-in-out"
              href="#"
            >
              <span className="bg-left-bottom bg-gradient-to-r text-sm from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Forget your password?
              </span>
            </a>
            <button
              className="bg-theme-color shadow-lg mt-6 p-2 text-white rounded-lg w-full border-2 border-white hover:scale-105 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
