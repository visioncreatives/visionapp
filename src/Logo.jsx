/**
 * LogoMark — the two-pill "V" mark from the Vision brand identity.
 * Faithfully recreates the original: a short stubby pill (upper-left, slight
 * counterclockwise tilt) and a long diagonal pill (right, sweeping down-left).
 *
 * Props:
 *   size  — height in px (width scales proportionally). Default: 32.
 *   color — fill color. Default: "#2A2A2A".
 */
export function LogoMark({ size = 32, color = "#2A2A2A" }) {
  // viewBox is 44 × 54; width scales to match requested height
  const w = Math.round(size * (44 / 54))
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 44 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left pill — short, slightly tilted counterclockwise (~-14°) */}
      <rect
        x="4"
        y="8"
        width="13"
        height="21"
        rx="6.5"
        fill={color}
        transform="rotate(-14 10.5 18.5)"
      />
      {/* Right pill — long diagonal sweep, tilted ~-43° */}
      <rect
        x="20.5"
        y="8"
        width="13.5"
        height="38"
        rx="6.75"
        fill={color}
        transform="rotate(-43 27.25 27)"
      />
    </svg>
  )
}

/**
 * Full logo lockup: mark + "V I S I O N" wordmark side by side.
 * Drop-in replacement for the nav text link — wrap in your own <a> or <Link>.
 */
export function LogoLockup({ size = 28, color = "#2A2A2A" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} color={color} />
      <span
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: "0.32em",
          fontSize: 14,
          color,
          lineHeight: 1,
        }}
      >
        V I S I O N
      </span>
    </span>
  )
}
