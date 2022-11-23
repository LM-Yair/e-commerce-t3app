
export const Label = ({htmlFor = "", text = ""}) => {
  return (
    <label htmlFor={htmlFor} className="text-neutral-500" >
      {text}
    </label>
  )
}
