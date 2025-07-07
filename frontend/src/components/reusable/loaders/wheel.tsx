import styles from "./spinner.module.css";

interface WheelProps {
  className?: string;
}

const Wheel: React.FC<WheelProps> = ({ className = "" }) => {
  return (
    <div className={`${styles.spinner} ${className}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
};

export default Wheel;
