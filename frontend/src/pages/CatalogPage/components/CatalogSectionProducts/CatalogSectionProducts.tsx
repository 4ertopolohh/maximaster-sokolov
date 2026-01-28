import { useEffect, useMemo, useState } from 'react'

import CatalogCard from '../../../../components/CatalogCard/CatalogCard'
import type { CatalogCardProps } from '../../../../components/CatalogCard/CatalogCard'
import CatalogPagesSwiper from '../CatalogPagesSwiper/CatalogPagesSwiper'
import '../CatalogSectionProducts/CatalogSectionProducts.scss'
import CatalogProductsHeader from '../CatalogProductsHeader/CatalogProductsHeader'
import type { HeaderFilterValue } from '../HeaderFilter/HeaderFilter'

type CatalogSectionProductsProps = {
  items: CatalogCardProps[]
}

const PAGE_SIZE = 9

const CatalogSectionProducts = ({ items }: CatalogSectionProductsProps) => {
  const safeItems = useMemo(() => items.filter((item) => Boolean(item.productIcon)), [items])

  const itemsSignature = useMemo(
    () => safeItems.map((item) => item.id).join('|'),
    [safeItems],
  )

  const [activePage, setActivePage] = useState<number>(1)
  const [sortValue, setSortValue] = useState<HeaderFilterValue>('rating')

  useEffect(() => {
    setActivePage(1)
    setSortValue('rating')
  }, [itemsSignature])

  const sortedItems = useMemo(() => {
    if (sortValue === 'rating') return safeItems

    const copy = safeItems.slice()
    copy.sort((a, b) => {
      const pa = Number(a.price)
      const pb = Number(b.price)

      if (sortValue === 'descending') return pb - pa
      return pa - pb
    })

    return copy
  }, [safeItems, sortValue])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE)),
    [sortedItems.length],
  )

  useEffect(() => {
    setActivePage((prev) => {
      if (prev < 1) return 1
      if (prev > totalPages) return totalPages
      return prev
    })
  }, [totalPages])

  const startIndex = useMemo(() => (activePage - 1) * PAGE_SIZE, [activePage])

  const currentItems = useMemo(() => {
    const endIndex = startIndex + PAGE_SIZE
    return sortedItems.slice(startIndex, endIndex)
  }, [sortedItems, startIndex])

  if (safeItems.length === 0) {
    return (
      <div className="catalogSectionProductsWrapper">
        <CatalogProductsHeader
          count="0"
          sortValue={sortValue}
          onSortChange={setSortValue}
        />
      </div>
    )
  }

  return (
    <div className="catalogSectionProductsWrapper">
      <CatalogProductsHeader
        count={String(safeItems.length)}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <div className="catalogSectionProducts">
        {currentItems.map((item, index) => (
          <CatalogCard
            key={`${item.id}-${startIndex + index}`}
            id={item.id}
            productIcon={item.productIcon}
            title={item.title}
            price={item.price}
            productId={item.productId}
            preferredColor={item.preferredColor}
          />
        ))}
      </div>

      <CatalogPagesSwiper
        totalPages={totalPages}
        activePage={activePage}
        onChange={setActivePage}
      />
    </div>
  )
}

export default CatalogSectionProducts
