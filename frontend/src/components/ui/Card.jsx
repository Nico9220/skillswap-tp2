export function Card({ className = '', children }) {
  return (
    <div
      className={
        'rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5 shadow-sm hover:shadow-md transition ' +
        className
      }
    >
      {children}
    </div>
  );
}
