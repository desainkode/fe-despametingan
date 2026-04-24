import { useState, useEffect, useRef } from 'react'

export function useStrukturPagination() {
  const [activeStrukturPage, setActiveStrukturPage] = useState<number>(0)
  const [strukturTotalPages, setStrukturTotalPages] = useState<number>(1)
  const strukturSliderRef = useRef<HTMLDivElement | null>(null)

  const updateStrukturPagination = () => {
    const slider = strukturSliderRef.current
    if (!slider) return

    const totalPages = Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth))
    const maxScroll = slider.scrollWidth - slider.clientWidth

    setStrukturTotalPages(totalPages)

    if (maxScroll <= 0 || totalPages === 1) {
      setActiveStrukturPage(0)
      return
    }

    const ratio = slider.scrollLeft / maxScroll
    const page = Math.round(ratio * (totalPages - 1))
    setActiveStrukturPage(Math.min(totalPages - 1, Math.max(0, page)))
  }

  const handleStrukturScroll = (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget
    const totalPages = Math.max(1, Math.ceil(scrollWidth / clientWidth))
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll <= 0 || totalPages === 1) {
      setStrukturTotalPages(totalPages)
      setActiveStrukturPage(0)
      return
    }

    const ratio = scrollLeft / maxScroll
    const page = Math.round(ratio * (totalPages - 1))

    setStrukturTotalPages(totalPages)
    setActiveStrukturPage(Math.min(totalPages - 1, Math.max(0, page)))
  }

  const goToStrukturPage = (page: number) => {
    const slider = strukturSliderRef.current
    if (!slider) return

    const maxScroll = slider.scrollWidth - slider.clientWidth
    const boundedPage = Math.min(strukturTotalPages - 1, Math.max(0, page))
    const divisor = Math.max(1, strukturTotalPages - 1)
    const targetLeft = (boundedPage / divisor) * maxScroll

    slider.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    })
  }

  const goToPrevStrukturPage = () => {
    goToStrukturPage(activeStrukturPage - 1)
  }

  const goToNextStrukturPage = () => {
    goToStrukturPage(activeStrukturPage + 1)
  }

  useEffect(() => {
    updateStrukturPagination()

    const onResize = () => updateStrukturPagination()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return {
    strukturSliderRef,
    activeStrukturPage,
    strukturTotalPages,
    handleStrukturScroll,
    goToPrevStrukturPage,
    goToNextStrukturPage,
  }
}
