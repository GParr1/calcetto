import { useWindowDimensions } from 'react-native'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export type Responsive<X> = { [key: string]: X }
export type ResponsiveProp<X> = X | Responsive<X> | X[]

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}
export const useResponsiveValue = <T>(value: ResponsiveProp<T>): T => {
  const { width } = useWindowDimensions()
  const breakpoint = getBreakpoint(width)

  if (Array.isArray(value)) {
    // mobile, tablet, desktop
    return value[0] as T
  }

  if (typeof value === 'object') {
    return (value[breakpoint] ?? Object.values(value)[0]) as T
  }

  return value
}


export function mapResponsiveValues<X, R = unknown>(
  responsiveValues: ResponsiveProp<X>,
  mapFn: (value: X) => R
): ResponsiveProp<R> {
  if (responsiveValues == null) return responsiveValues as ResponsiveProp<R>

  // Array
  if (Array.isArray(responsiveValues)) {
    return responsiveValues.map((v) =>
      v != null ? mapFn(v) : v
    ) as ResponsiveProp<R>
  }

  // Oggetto responsive
  if (typeof responsiveValues === 'object') {
    const result: Record<string, R> = {}

    for (const key in responsiveValues) {
      const value = (responsiveValues as Responsive<X>)[key]

      if (value != null) {
        const mapped = mapFn(value)

        if (mapped != null) {
          result[key] = mapped
        }
      }
    }

    return result
  }

  // Valore singolo
  return mapFn(responsiveValues as X)
}
