export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300">
      {children}
    </label>
  )
}
