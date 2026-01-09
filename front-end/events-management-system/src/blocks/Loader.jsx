import { PropagateLoader } from "react-spinners";
const Loader = ({ className, children }) => {
  return (
    <div
      className={`${className} flex justify-center items-center h-screen  fixed inset-0 bg-blue-100/50 bg-opacity-50`}
    >
      {children}
    </div>
  );
};

export default Loader;
