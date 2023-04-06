import clsx from "clsx";

export default function GlassPane({ children, className }) {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200",
        className
      )}
    >
      <div className="glass-pane__content">{children}</div>
    </div>
  );
}
