import '../ProductPreviewMiniImage/ProductPreviewMiniImage.scss'

export type ProductPreviewMiniImageProps = {
  image: string
  onClick: (image: string) => void
  isActive: boolean
}

const ProductPreviewMiniImage = ({ image, onClick, isActive }: ProductPreviewMiniImageProps) => {
  return (
    <button
      type="button"
      className={`productPreviewMiniImage${isActive ? ' productPreviewMiniImageActive' : ''}`}
      onClick={() => onClick(image)}
    >
      <img src={image} alt="" loading="lazy" />
    </button>
  )
}

export default ProductPreviewMiniImage
