import React from "react";
import styles from "./spinner.module.css";

type RequestSpinnerProps = {
  size?: number;
  className?: string;
};

const RequestSpinner: React.FC<RequestSpinnerProps> = ({
  className = "",
  size = 60,
}) => {
  return (
    <div
      style={{ width: size + "px", height: size + "px" }}
      className={`${className} ${styles.requestSpinner}`}
    ></div>
  );
};

export default RequestSpinner;
