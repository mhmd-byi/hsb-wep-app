import Image from "next/image";

export default function Login() {
  return (
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="grid gap-8">
        <div class="border-[20px] border-transparent rounded-[20px] bg-theme-color shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
          <div className="flex flex-col justify-center items-center">
            <Image src="/hsb-logo.png" width={250} height={30} />
            <h1 class="pt-8 pb-6 font-bold text-white text-4xl text-center cursor-default">
              Log in
            </h1>
          </div>
          <form action="#" method="post" class="space-y-4">
            <div>
              <input
                id="number"
                class="border p-3 bg-white text-theme-color shadow-md placeholder:text-base focus:scale-105 focus:border-theme-color ease-in-out duration-300 border-theme-color rounded-lg w-full"
                type="number"
                placeholder="Enter ITS Number"
                required
              />
            </div>
            <div>
              <input
                id="password"
                class="border p-3 shadow-md text-theme-color bg-white placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <a
              class="group text-white transition-all duration-100 ease-in-out"
              href="#"
            >
              <span class="bg-left-bottom bg-gradient-to-r text-sm from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Forget your password?
              </span>
            </a>
            <button
              class="bg-theme-color shadow-lg mt-6 p-2 text-white rounded-lg w-full border-2 border-white hover:scale-105 transition duration-300 ease-in-out"
              type="submit"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
