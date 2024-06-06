"use client";
import { useForm } from "react-hook-form";

export default function subscription() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "abc@123",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // const res = await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // console.log(res);
    // if (res.status === 200) {
    //   setOpen(false);
    //   reset();
    // } else {
    //   alert("User not added");
    // }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white border-4 border-theme-color rounded-lg shadow relative w-2/4">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Member Subscription Pannel</h3>
        </div>
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="its"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  ITS Number
                </label>
                <input
                  type="number"
                  id="its"
                  {...register("its")}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-theme-color block w-full p-2.5"
                  placeholder="3040xxxx"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Enter Member Name"
                  required
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Batch
                </label>
                <input
                  type="number"
                  id="batch"
                  {...register("batch")}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Batch"
                  required
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Renew For How Many Years
                </label>
                <select
                  {...register("subscriptioRenew")}
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                >
                  <option value="0">Select Options</option>
                  <option value="oneYear">One Year</option>
                  <option value="twoYears">Two Years</option>
                  <option value="threeYears">Three Years</option>
                  <option value="fourYears">Four Years</option>
                  <option value="fiveYears">Five Years</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-10 pt-6 border-t border-gray-200 rounded-b">
              <button
                className="text-white bg-theme-color font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
