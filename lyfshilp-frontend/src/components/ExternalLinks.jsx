// Small helper to open external links safely (target + rel) and optionally show an "external" icon.
export default function ExternalLinks({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-700 hover:text-blue-600 ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3h6v6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14L21 3" />
        </svg>
      </span>
    </a>
  );
}
