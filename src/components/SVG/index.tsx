type Props = {
  size?: number
  className?: string
}

export const SVGRefreshCircleFilled = ({ size = 30, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    role="button"
    aria-label="Riprova"
    className={className}
  >
    <circle cx="24" cy="24" r="24" fill="currentColor" />
    <path
      fill="#fff"
      d="M24 14a10 10 0 1 0 9.95 11h-2.07a8 8 0 1 1-2.1-6.11l-2.78 2.78H34V14l-2.52 2.52A9.98 9.98 0 0 0 24 14z"
    />
  </svg>
)