interface SectionWrapperProps {
  id?: string
  'aria-labelledby'?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({
  id,
  'aria-labelledby': ariaLabelledby,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
