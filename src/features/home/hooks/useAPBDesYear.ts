import { useState } from 'react'

export function useAPBDesYear(initialYear: number = 2026) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)

  return {
    selectedYear,
    setSelectedYear,
  }
}
