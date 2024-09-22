import { status } from "~/utils/constants";

interface StatusProps {
  selectedStatus: string;
  onSelectOption: (name: string, value: string) => void;
}

export const Status: React.FC<StatusProps> = ({ selectedStatus, onSelectOption }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {status.map((el) => (
        <div
          key={el.id}
          className={`flex justify-between items-center p-1 rounded-xl border-2 cursor-pointer hover:border-[#3662E3] ${
            selectedStatus === el.value
              ? "border-[#3662E3]"
              : "border-[#00000033]"
          }`}
          onClick={() => onSelectOption('status', el.value)}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`w-7 h-7 bg-[${el.bgColor}] rounded-md flex justify-center items-center`}
            >
              <img src={`assets/${el.icon}`} alt="icon" />
            </div>
            <p>{el.content}</p>
          </div>
          {selectedStatus === el.value && (
            <div className="bg-[#3662E3] rounded-full mr-2">
              <img src="assets/Done_round.svg" alt="" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
