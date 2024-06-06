"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";

export const Modal = ({ open, setOpen }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "abc@123",
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (res.status === 200) {
      setOpen(false);
      reset();
    } else {
      alert("User not added");
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1989; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-fit h-fit">
                <div className="bg-white border-4 border-theme-color rounded-lg shadow relative">
                  <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">Add Member</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-toggle="product-modal"
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
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
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            id="phone"
                            {...register("phone")}
                            minLength="1"
                            maxLength="10"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                            placeholder="Enter Phone Number"
                            required
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="batch"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Batch
                          </label>
                          <select
                            id="batch"
                            {...register("batch")}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-theme-color block w-full p-2.5"
                          >
                            <option value="">Select Year</option>
                            {generateYearOptions().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="role"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Role
                          </label>
                          {/*<input
                            type="text"
                            id="role"
                            {...register("role")}
                            className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                            placeholder="Enter Member Role"
  />*/}
                          <select
                            {...register("role")}
                            className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                          >
                            <option value="0">Select Options</option>
                            <option value="admin">admin</option>
                            <option value="member">member</option>
                          </select>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="profileImage"
                            className="text-sm font-medium text-gray-900 block mb-2"
                          >
                            Profile Image
                          </label>
                          <input
                            type="file"
                            id="profileImage"
                            className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-10 pt-6 border-t border-gray-200 rounded-b">
                        <button
                          className="text-white bg-theme-color font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
