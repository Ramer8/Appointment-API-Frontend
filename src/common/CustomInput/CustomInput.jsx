import "./CustomInput.css"
export const CustomInput = ({
  className,
  type,
  disabled,
  name,
  value,
  placeholder,
  functionChange,
  onBlurFunction,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={functionChange}
      onBlur={onBlurFunction}
    />
  )
}
