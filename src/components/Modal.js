"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export const Modal = ({ onClose, children }) => {
  const [open, setOpen] = useState(true);

  const [its, setIts] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [password, setPassword] = useState("abc@123");
  const [role, setRole] = useState("member");

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, its, phone, email, batch, role, password }),
    });
    console.log(res);
    if (res.status === 200) {
      alert("User created");
    } else {
      alert("User not added");
    }
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <DialogTitle
                      as="h3"
                      className="text-3xl  text-center font-bold leading-6 text-theme-color"
                    >
                      Member Details
                    </DialogTitle>

                    <form class="mt-8" onSubmit={handleSubmit}>
                      <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="its"
                            onChange={(e) => setIts(e.target.value)}
                            id="its_number"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="its_number"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            ITS Number
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Name
                          </label>
                        </div>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          for="email"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>
                      <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="phone"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Phone Number
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="batch"
                            onChange={(e) => setBatch(e.target.value)}
                            id="batch"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="batch"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Batch
                          </label>
                        </div>
                      </div>
                      <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="file"
                            name="profile-image"
                            id="profile-image"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            for="profile-image"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Upload Profile Image
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            id="role"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none  border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          />
                          <label
                            for="role"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Role
                          </label>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-theme-color px-3 py-2 text-sm font-semibold border-2 border-theme-color text-white hover:text-theme-color shadow-sm hover:bg-transparent sm:ml-3 sm:w-auto"
                        >
                          Register
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                          onClick={handleClose}
                        >
                          Cancel
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
