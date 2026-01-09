import { FaRegWindowClose } from "react-icons/fa";
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-blue-100/50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-300 p-4 rounded-lg shadow-md relative lg:w-[40%] md:w-[50%] w-[80%] max-h-screen overflow-y-auto scrollbar-indigo">
        <div className="absolute top-2 right-2 cursor-pointer text-gray-700 hover:text-gray-900 text-2xl">
          <FaRegWindowClose onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
