// Consistent section header: mono eyebrow, title, optional intro
export default function SectionHeading({ eyebrow, title, children, align = 'left', as: Tag = 'h2' }) {
  const center = align === 'center';
  return (
    <div className={`reveal mb-10 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`mt-3 ${Tag === 'h1' ? 'text-3xl sm:text-4xl font-semibold' : 'section-title'}`}>{title}</Tag>
      {children && <p className="mt-3 text-[0.95rem] leading-relaxed text-gray-400">{children}</p>}
    </div>
  );
}
