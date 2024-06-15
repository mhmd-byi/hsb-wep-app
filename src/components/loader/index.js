import "./loader.css";

export const Loader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <div className="loader"></div>
      </div>
    </div>
  );
};
