import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { TransitionEvent } from 'react'
import MoreButton from '../MoreButton/MoreButton'
import '../ProductPreviewDescriptionText/ProductPreviewDescriptionText.scss'

export type ProductPreviewDescriptionTextProps = {
  description: string
}

const MAX_CHARS = 169
const COLLAPSED_MAX_HEIGHT = 75

const ProductPreviewDescriptionText = ({ description }: ProductPreviewDescriptionTextProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [containerHeight, setContainerHeight] = useState<string>('auto')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [collapsedChars, setCollapsedChars] = useState<number>(MAX_CHARS)
  const [contentWidth, setContentWidth] = useState<number>(0)

  const contentRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const measureTextRef = useRef<HTMLSpanElement | null>(null)

  const rafRef = useRef<number | null>(null)
  const raf2Ref = useRef<number | null>(null)

  const isLong = description.length > MAX_CHARS

  const visibleText = useMemo(() => {
    if (!isLong) return description
    if (isExpanded) return description
    return description.slice(0, Math.min(collapsedChars, description.length)).trimEnd()
  }, [description, isExpanded, isLong, collapsedChars])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const nextWidth = entry.contentRect.width
      setContentWidth((prev) => (Math.abs(prev - nextWidth) > 0.5 ? nextWidth : prev))
    })

    ro.observe(el)

    return () => {
      ro.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    if (!isLong) {
      setIsExpanded(false)
      setIsAnimating(false)
      setContainerHeight('fit-content')
      if (collapsedChars !== MAX_CHARS) setCollapsedChars(MAX_CHARS)
    }
  }, [isLong, collapsedChars])

  useLayoutEffect(() => {
    if (!isLong) return
    if (isExpanded) return

    const measureEl = measureRef.current
    const measureTextEl = measureTextRef.current

    if (!measureEl || !measureTextEl) return

    const maxCandidate = Math.min(MAX_CHARS, description.length)

    const fits = (chars: number) => {
      measureTextEl.textContent = description.slice(0, chars).trimEnd()
      return measureEl.scrollHeight <= COLLAPSED_MAX_HEIGHT
    }

    if (fits(maxCandidate)) {
      if (collapsedChars !== maxCandidate) setCollapsedChars(maxCandidate)
      return
    }

    let low = 0
    let high = maxCandidate
    let best = 0

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (fits(mid)) {
        best = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    const minChars = description.length > 0 ? 1 : 0
    const next = Math.max(best, minChars)

    if (next !== collapsedChars) setCollapsedChars(next)
  }, [collapsedChars, contentWidth, description, isExpanded, isLong])

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    if (isAnimating) return

    if (!isLong) {
      setContainerHeight('auto')
      return
    }

    if (isExpanded) {
      setContainerHeight('auto')
      return
    }

    setContainerHeight(`${Math.min(el.scrollHeight, COLLAPSED_MAX_HEIGHT)}px`)
  }, [isAnimating, isExpanded, isLong, visibleText])

  useEffect(() => {
    if (!isAnimating) return
    const el = contentRef.current
    if (!el) return

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    if (raf2Ref.current !== null) cancelAnimationFrame(raf2Ref.current)

    rafRef.current = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        const nextHeight = isExpanded ? el.scrollHeight : Math.min(el.scrollHeight, COLLAPSED_MAX_HEIGHT)
        setContainerHeight(`${nextHeight}px`)
      })
    })

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (raf2Ref.current !== null) cancelAnimationFrame(raf2Ref.current)
      rafRef.current = null
      raf2Ref.current = null
    }
  }, [isAnimating, visibleText, isExpanded])

  const handleToggle = () => {
    if (!isLong) return
    const el = contentRef.current

    if (!el) {
      setIsExpanded((prev) => !prev)
      return
    }

    const startHeight = el.getBoundingClientRect().height
    setContainerHeight(`${startHeight}px`)
    setIsAnimating(true)
    setIsExpanded((prev) => !prev)
  }

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== 'height') return
    if (!isAnimating) return

    const el = contentRef.current
    setIsAnimating(false)

    if (!el) {
      setContainerHeight('auto')
      return
    }

    if (isExpanded) {
      setContainerHeight('auto')
      return
    }

    setContainerHeight(`${Math.min(el.scrollHeight, COLLAPSED_MAX_HEIGHT)}px`)
  }

  return (
    <div className="productPreviewDescriptionText">
      {isLong ? (
        <div ref={measureRef} className="productPreviewDescriptionText__measure" aria-hidden="true">
          <p>
            <span ref={measureTextRef}>{visibleText}</span>{' '}
            <button type="button" className="moreButton">
              more...
            </button>
          </p>
        </div>
      ) : null}

      <div
        ref={contentRef}
        className="productPreviewDescriptionText__content"
        style={{ height: containerHeight }}
        onTransitionEnd={handleTransitionEnd}
      >
        <p>
          {visibleText}
          {isLong ? (
            <>
              {' '}
              <MoreButton label={isExpanded ? 'Turn.' : 'more...'} onClick={handleToggle} />
            </>
          ) : null}
        </p>
      </div>
    </div>
  )
}

export default ProductPreviewDescriptionText
