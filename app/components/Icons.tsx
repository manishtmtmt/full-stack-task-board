import { icons } from "~/utils/constants";

interface IconsProps {
  selectedIcon: string;
  onSelectOption: (name: string, value: string) => void;
}

export const Icons: React.FC<IconsProps> = ({ selectedIcon, onSelectOption }) => {
  return (
    <div className="flex gap-3">
      {icons.map((el, idx) => (
        <div
          key={idx}
          className={`w-10 h-10 flex justify-center items-center rounded-md cursor-pointer hover:bg-[#F5D565] ${
            selectedIcon === el ? "bg-[#F5D565]" : "bg-[#E3E8EF]"
          }`}
          onClick={() => onSelectOption('iconPath', el)}
        >
          <img src={`assets/${el}`} alt="icon" className="w-1/2 h-1/2" />
        </div>
      ))}
    </div>
  );
};
