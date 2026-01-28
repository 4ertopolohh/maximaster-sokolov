import ProductPreviewDescription from '../ProductPreviewDescription/ProductPreviewDescription'
import type { ProductPreviewDescriptionProps } from '../ProductPreviewDescription/ProductPreviewDescription'
import ProductPreviewImages from '../ProductPreviewImages/ProductPreviewImages'
import type { ProductPreviewImagesProps } from '../ProductPreviewImages/ProductPreviewImages'
import '../ProductPreviewSection/ProductPreviewSection.scss'

export type ProductPreviewSectionProps = ProductPreviewDescriptionProps & ProductPreviewImagesProps

const ProductPreviewSection = ({
  title,
  fullPrice,
  salePrice,
  images,
  selectedImage,
  productTitle,
  onSelectImage,
  memoryOptions,
  disabledMemoryOptions,
  selectedColor,
  onSelectColor,
  colorOptions,
  characteristics,
  descriptionText,
  terms,
}: ProductPreviewSectionProps) => {
  const hasImages = images.length > 0
  const hasColors = colorOptions.length > 0

  return (
    <section className="productPreviewSection">
      <div className="container">
        {hasImages && (
          <ProductPreviewImages
            images={images}
            selectedImage={selectedImage}
            productTitle={productTitle}
            onSelectImage={onSelectImage}
          />
        )}
        <ProductPreviewDescription
          title={title}
          fullPrice={fullPrice}
          salePrice={salePrice}
          memoryOptions={memoryOptions}
          disabledMemoryOptions={disabledMemoryOptions}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
          colorOptions={hasColors ? colorOptions : []}
          characteristics={characteristics}
          descriptionText={descriptionText}
          terms={terms}
        />
      </div>
    </section>
  )
}

export default ProductPreviewSection
