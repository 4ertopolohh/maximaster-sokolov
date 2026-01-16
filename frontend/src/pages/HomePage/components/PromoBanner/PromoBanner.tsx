import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton'
import '../PromoBanner/PromoBanner.scss'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import macBookPromo from '../../../../assets/images/pictures/macBookPromo.png'

type PromoBannerAlign = 'left' | 'right'

export type PromoBannerProps = {
  promoBannerImage?: string
  promoBannerTitle: string
  promoBannerTitleSpan?: string
  promoBannerSubtitle: string
  shopNowButtonColor: string
  width?: number | string
  height?: number | string
  backgroundColor?: string
  titleFontSize?: number | string
  subtitleFontSize?: number | string
  titleColor?: string
  subtitleColor?: string
  promoBannerImageWidth?: number | string
  align?: PromoBannerAlign
  promoBannerImageMargin?: number | string
  showShopNowButton?: boolean
  titleWidth?: number | string
  subtitleWidth?: number | string
  descriptionGap?: number | string
  titleLineHeight?: number | string
}

const PromoBanner = ({
  promoBannerImage = macBookPromo,
  promoBannerTitle,
  promoBannerTitleSpan,
  promoBannerSubtitle,
  shopNowButtonColor,
  width = 720,
  height = 600,
  backgroundColor,
  titleFontSize = 69,
  subtitleFontSize = 14,
  titleColor,
  subtitleColor,
  promoBannerImageWidth = 292,
  align = 'right',
  promoBannerImageMargin,
  showShopNowButton = true,
  titleWidth,
  subtitleWidth,
  descriptionGap,
  titleLineHeight,
}: PromoBannerProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [isVisible])

  const rootStyles: CSSProperties = {
    width,
    height,
    justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
    ...(backgroundColor ? { backgroundColor } : null),
  }

  const descriptionStyles: CSSProperties = {
    ...(descriptionGap ? { gap: descriptionGap } : null),
  }

  const titleStyles: CSSProperties = {
    ...(titleFontSize ? { fontSize: titleFontSize } : null),
    ...(titleColor ? { color: titleColor } : null),
    ...(titleWidth ? { width: titleWidth } : null),
    ...(titleLineHeight ? { lineHeight: titleLineHeight } : null),
  }

  const subtitleStyles: CSSProperties = {
    ...(subtitleFontSize ? { fontSize: subtitleFontSize } : null),
    ...(subtitleColor ? { color: subtitleColor } : null),
    ...(subtitleWidth ? { width: subtitleWidth } : null),
  }

  const imageStyles: CSSProperties = {
    width: promoBannerImageWidth,
    ...(promoBannerImageMargin
      ? align === 'left'
        ? { marginRight: promoBannerImageMargin }
        : { marginLeft: promoBannerImageMargin }
      : null),
  }

  const imageEl = (
    <img
      src={promoBannerImage}
      alt=""
      loading="lazy"
      className="promoBannerImage"
      style={imageStyles}
    />
  )

  const descriptionEl = (
    <div className="promoBannerDescription" style={descriptionStyles}>
      <h4 className="promoBannerTitle" style={titleStyles}>
        {promoBannerTitle}
        {promoBannerTitleSpan ? <span> {promoBannerTitleSpan}</span> : null}
      </h4>
      <p className="promoBannerSubtitle" style={subtitleStyles}>
        {promoBannerSubtitle}
      </p>
      {showShopNowButton ? <ShopNowButton color={shopNowButtonColor} /> : null}
    </div>
  )

  return (
    <div
      ref={rootRef}
      className={`promoBanner${isVisible ? ' promoBanner--visible' : ''}`}
      style={rootStyles}
    >
      {align === 'left' ? imageEl : null}
      {descriptionEl}
      {align === 'right' ? imageEl : null}
    </div>
  )
}

export default PromoBanner
