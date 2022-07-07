import React from "react";

const PayuCallback: React.FC<any> = (): JSX.Element | null => {
  const success = !window.location.search.includes("error");
  return (
    <div className={`w-96 justify-center items-center bg-gray-100 `}>
      <div
        className={`px-6 py-6 mt-4 text-left bg-white shadow-lg ${
          success ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {success ? "Gratulacje" : "Płatność nie powiodła się"}
      </div>
    </div>
  );
};

export default PayuCallback;
