"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ open, title, handleClose, children }) => {

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => null}>
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
                    <h3 className="text-xl font-semibold">
                      {title}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-toggle="product-modal"
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {children}
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
