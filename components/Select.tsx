export default function Select({ className, options, name, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mr-3">
        {name}
      </label>
      <select
        className={`border border-gray-300 rounded-md bg-white p-2 ${className}`}
        {...props}
        name={name}
      >
        {options.map((option, i) => {
          return (
            <option
              key={i}
              value={option.value}
              // TODO styling option
              className={`border border-gray-300 rounded-md bg-white p-2 ${className}`}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
