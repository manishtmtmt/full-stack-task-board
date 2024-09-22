interface ButtonProps {
  action: string;
  content: string;
  icon: string;
}

export const Button: React.FC<ButtonProps> = ({ action, content, icon }) => {
  return (
    <button
      name="_action"
      value={action}
      type="submit"
      className={`${
        action === "deleteTask" ? "bg-slate-400" : "bg-blue-600"
      } flex gap-2 rounded-full items-center px-4 py-1 text-white`}
    >
      <span>{content}</span>
      <img src={`assets/${icon}`} alt="" />
    </button>
  );
};
