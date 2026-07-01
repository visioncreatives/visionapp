/**
 * LogoMark — renders the exact Vision logo mark image.
 *
 * Props:
 *   size  — height in px (width scales proportionally). Default: 32.
 */
export function LogoMark({ size = 32 }) {
  return (
    <img
      src="/logo transparent.png"
      alt="Vision"
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
    />
  )
}

/**
 * Full logo lockup: mark + "V I S I O N" wordmark side by side.
 */
export function LogoLockup({ size = 28, color = "#2A2A2A" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} />
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
        I S I O N
      </span>
    </span>
  )
}
