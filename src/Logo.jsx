/**
 * LogoMark — renders the exact Vision logo mark image.
 *
 * Props:
 *   size  — height in px (width scales proportionally). Default: 32.
 *   light — use the white variant, for dark/photo backgrounds. Default: false.
 */
export function LogoMark({ size = 32, light = false }) {
  return (
    <img
      src={light ? "/plain V logo letter white.png" : "/plain V logo letter.png"}
      alt="Vision"
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
    />
  )
}

/**
 * Full logo lockup: mark + "V I S I O N" wordmark side by side.
 */
export function LogoLockup({ size = 14, color = "#2A2A2A", light = false }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <LogoMark size={size} light={light} />
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
