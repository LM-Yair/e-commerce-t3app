interface SubmitProps {
  className?: string;
  text: string;
}

export const Submit = ({ className = "", text = "" }: SubmitProps) => {
  return <button className={className}>{text}</button>;
};
