export function Label({ children, htmlFor, className = '' }) {
  return <label htmlFor={htmlFor} className={'block text-sm mb-1 ' + className}>{children}</label>;
}
export function Input(props) {
  return (
    <input
      {...props}
      className={
        'w-full rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ' +
        (props.className || '')
      }
    />
  );
}
export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={
        'w-full rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ' +
        (props.className || '')
      }
    />
  );
}
