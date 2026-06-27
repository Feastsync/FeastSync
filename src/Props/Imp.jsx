const Imp = ({ type = "text", onBlur, placeholder, value, onChange, className,onKeyDown, icon, style }) => {
  return (
    <div className={`inp_group ${className || ""}`}>
      {icon && <span className="inp_icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="inp_field"
        style={style}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
export default Imp