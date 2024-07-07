
const Tab = ({
  heading,
  graph,
  isActive,
  tabIndex,
  handleTabToggle,
  bgColor,
  borderColor,
}: {
  heading: string;
  graph: React.ReactNode;
  className: string;
  isActive: boolean[];
  tabIndex: number;
  handleTabToggle: (index: number) => void;
  bgColor: string;
  borderColor: string;
}) => {
  return (
    <div className="">
      <div className="">
        <button
          className={`px-2 lg:min-w-[7rem] py-1 w-fit  text-black dark:bg-[#251a2b] dark:text-white ${
            isActive[tabIndex]
              ? "border-b-2" + " " +  bgColor + " " + borderColor + " "
              : ""
          }`}
          onClick={() => handleTabToggle(tabIndex)}
        >
          {heading}
        </button>
      </div>
      {isActive[tabIndex] && (
        <div className="w-[100%] lg:w-[560px] mt-3 absolute left-0">{graph}</div>
      )}
    </div>
  );
};

export default Tab