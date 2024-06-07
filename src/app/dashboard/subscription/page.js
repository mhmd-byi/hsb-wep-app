"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function subscription() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      its: "",
      name: "",
      batch: "",
    },
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // state to determine the message type (success/error)
  const itsNumber = watch("its");

  useEffect(() => {
    if (itsNumber.length >= 8) {
      fetchUserDetails(itsNumber);
    }
  }, [itsNumber]);

  const fetchUserDetails = async (its) => {
    try {
      const response = await fetch(`/api/fetch-user-by-its/${its}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setValue("name", data.user.name);
        setValue("batch", data.user.batch);
      } else {
        console.error("No user found with this ITS number.");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! Status: ${response.status}`
        );
      }

      console.log("Subscription saved:", result);
      setMessage("Subscription created successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Failed to submit subscription:", error);
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white border-4 border-theme-color rounded-lg shadow relative w-2/4">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Member Subscription Panel</h3>
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
                  className="shadow-sm cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Member Name"
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="batch"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Batch
                </label>
                <input
                  type="number"
                  id="batch"
                  {...register("batch")}
                  className="shadow-sm cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Batch"
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="subscription"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Membership years
                </label>
                <select
                  {...register("subscriptionYears")}
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                >
                  <option value="0">Choose number of years</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>
              {/* Add other fields and submit button here */}
            </div>
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200 rounded-b">
              <span
                className={`text-sm font-bold ${
                  messageType === "success"
                    ? "text-theme-color"
                    : "text-red-500"
                }`}
              >
                {message}
              </span>
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
