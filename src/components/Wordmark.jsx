/**
 * "BugBiceps" lockup — logo.png inside a #0F171A chip (its baked background
 * colour) plus the two-tone wordmark.
 */
export default function Wordmark({ size = 'md', className = '' }) {
  const chip = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  const text = size === 'lg' ? 'text-xl' : 'text-[17px]';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`logo-chip shrink-0 ${chip}`}>
        {/* object-contain, never cover: the artwork is a full lockup and any
            cropping cuts the arms and the baked wordmark off. */}
        <img
          src="/logo.png"
          alt="BugBiceps logo"
          width="48"
          height="48"
          className="h-full w-full object-contain"
        />
      </span>
      <span className={`font-display font-bold tracking-tight ${text}`}>
        <span className="text-flag">Bug</span>
        <span className="text-ember-400">Biceps</span>
      </span>
    </span>
  );
}
