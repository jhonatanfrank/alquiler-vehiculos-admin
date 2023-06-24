import React from "react";
import "../style/Spinner.css";

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border custom-size" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
