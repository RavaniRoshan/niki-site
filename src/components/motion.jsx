import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Single element that fades + lifts into place. Used for section blocks
// (whileInView) or hero blocks (onLoad).
export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 16,
  onLoad = false,
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  const hidden = { opacity: 0, y: reduce ? 0 : y }
  const show = {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0.001 : 0.55, delay: reduce ? 0 : delay, ease: EASE },
  }
  const common = { className, initial: 'hidden', variants: { hidden, show }, ...rest }
  if (onLoad) return <Comp {...common} animate="show">{children}</Comp>
  return (
    <Comp {...common} whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  )
}

const container = (reduce) => ({
  hidden: {},
  show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.06 } },
})

// Container that staggers its <StaggerItem> children when scrolled into view
// (or on load, for the hero).
export function Stagger({ children, as = 'div', className, onLoad = false, amount = 0.15, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  const common = { className, variants: container(reduce), initial: 'hidden', ...rest }
  if (onLoad) return <Comp {...common} animate="show">{children}</Comp>
  return (
    <Comp {...common} whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  )
}

export function StaggerItem({ children, as = 'div', className, y = 14, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.001 : 0.5, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
