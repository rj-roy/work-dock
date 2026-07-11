export default function DropdownOption({
  label,
  selected,
  href,
}: {
  label: string;
  selected: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-sm transition-colors ${
        selected
          ? "bg-indigo-50 text-indigo-700 font-medium"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
      {selected && <span className="text-indigo-600">✓</span>}
    </a>
  );
}