export default function Select({ className, options, name, ...props }) {
  return (
    <>
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
              className={`border border-gray-300 rounded-md bg-white p-2 ${className}`}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
