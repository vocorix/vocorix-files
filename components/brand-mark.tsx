type BrandMarkProps = { className?: string };

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 112 112" fill="none" aria-hidden="true" focusable="false">
      <path d="M81.46 30.54 A36 36 0 1 0 92 56" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M88 56H100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <circle cx="104" cy="56" r="5.2" fill="#F06445" />
    </svg>
  );
}
