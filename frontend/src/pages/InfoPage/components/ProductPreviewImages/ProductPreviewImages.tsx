import '../ProductPreviewImages/ProductPreviewImages.scss'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ProductPreviewMiniImage from '../ProductPreviewMiniImage/ProductPreviewMiniImage'

export type ProductPreviewImagesProps = {
  images: string[]
  selectedImage: string
  productTitle: string
  onSelectImage: (image: string) => void
}

const MODAL_ANIMATION_MS = 200

const ProductPreviewImages = ({
  images,
  selectedImage,
  productTitle,
  onSelectImage,
}: ProductPreviewImagesProps) => {
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)

  const openModal = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsModalMounted(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsModalMounted(false)
    }, MODAL_ANIMATION_MS)
  }

  useEffect(() => {
    if (!isModalMounted) return
    const id = window.requestAnimationFrame(() => {
      setIsModalOpen(true)
    })
    return () => {
      window.cancelAnimationFrame(id)
    }
  }, [isModalMounted])

  useEffect(() => {
    if (!isModalMounted) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isModalMounted])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const modal = isModalMounted
    ? createPortal(
        <div
          className={`imageModalOverlay${isModalOpen ? ' imageModalOverlay--open' : ''}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={productTitle}
        >
          <div className="imageModalContent" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt={productTitle} loading="eager" />
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <div className="productPreviewImages">
        <div className="productPreviewSwiper">
          {images.map((image) => (
            <ProductPreviewMiniImage
              key={image}
              image={image}
              onClick={onSelectImage}
              isActive={image === selectedImage}
            />
          ))}
        </div>
        <div className="productBigImage" onClick={openModal}>
          <img src={selectedImage} alt={productTitle} loading="lazy" />
        </div>
      </div>
      {modal}
    </>
  )
}

export default ProductPreviewImages
