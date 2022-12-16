interface NoticeProps {
  text: string;
}

export const Notice = ({ text }: NoticeProps) => {
  return (
    <p className="border-l-4 border-cyan-500 pl-10 py-2 text-xl text-neutral-500">
      {text}
    </p>
  );
};
