import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="h-[362px] flex justify-center items-center">
      <FaSpinner className="text-textLight text-5xl animate-spin-slow" />
    </div>
  );
};
export default Loading;