export default function Badge({ children }) {
  return (
    <span className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2 py-1">
      {children}
    </span>
  );
}
