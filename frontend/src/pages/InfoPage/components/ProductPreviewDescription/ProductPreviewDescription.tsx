import { useState } from 'react'
import MemoryTypeButton from '../MemoryTypeButton/MemoryTypeButton'
import ProductPreviewCharacteristicBlock from '../ProductPreviewCharacteristicBlock/ProductPreviewCharacteristicBlock'
import '../ProductPreviewDescription/ProductPreviewDescription.scss'
import SelectColor from '../SelectColor/SelectColor'

import ProductPreviewDescriptionText from '../ProductPreviewDescriptionText/ProductPreviewDescriptionText'
import AddToWishlistButton from '../AddToWishlistButton/AddToWishlistButton'
import AddToCardButton from '../AddToCardButton/AddToCardButton'
import TermsOfPurchaseBlock from '../TermsOfPurchaseBlock/TermsOfPurchaseBlock'

export type ProductPreviewCharacteristicItem = {
  icon: string
  title: string
  description: string
}

export type TermsOfPurchaseItem = {
  icon: string
  title: string
  subtitle: string
}

export type ProductPreviewDescriptionProps = {
  title: string
  fullPrice: string
  salePrice: string
  memoryOptions: string[]
  disabledMemoryOptions?: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  colorOptions: string[]
  characteristics: ProductPreviewCharacteristicItem[]
  descriptionText: string
  terms: TermsOfPurchaseItem[]
}

const ProductPreviewDescription = ({
  title,
  fullPrice,
  salePrice,
  memoryOptions,
  disabledMemoryOptions,
  selectedColor,
  onSelectColor,
  colorOptions,
  characteristics,
  descriptionText,
  terms,
}: ProductPreviewDescriptionProps) => {
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null)

  const handleSelectMemory = (memory: string) => {
    setSelectedMemory(memory)
  }

  return (
    <div className="productPreviewDescription">
      <h1 className="productPreviewDescriptionTitle">{title}</h1>
      <h4 className="productPreviewDescriptionPrice">
        ${salePrice} <span>${fullPrice}</span>
      </h4>
      <SelectColor colors={colorOptions} selectedColor={selectedColor} onSelectColor={onSelectColor} />
      <div className="selectMemoryType">
        {memoryOptions.map((memory) => {
          const isDisabled = disabledMemoryOptions ? disabledMemoryOptions.includes(memory) : false
          return (
            <MemoryTypeButton
              key={memory}
              memory={memory}
              isActive={selectedMemory === memory}
              isDisabled={isDisabled}
              onClick={handleSelectMemory}
            />
          )
        })}
      </div>
      <div className="productPreviewCharacteristicBlocks">
        {characteristics.map((item) => (
          <ProductPreviewCharacteristicBlock
            key={`${item.title}-${item.description}`}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <ProductPreviewDescriptionText description={descriptionText} />
      <div className="productPreviewDescriptionAddButtons">
        <AddToWishlistButton />
        <AddToCardButton />
      </div>
      <div className="termsOfPurchaseBlocks">
        {terms.map((item) => (
          <TermsOfPurchaseBlock
            key={`${item.title}-${item.subtitle}`}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductPreviewDescription
