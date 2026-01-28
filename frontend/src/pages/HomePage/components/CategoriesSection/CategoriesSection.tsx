import { useEffect, useMemo, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import CategorieCard from '../CategorieCard/CategorieCard'
import '../CategoriesSection/CategoriesSection.scss'

// import phoneIcon from '../../../../assets/images/icons/phoneIcon.png'
// import smartWatchIcon from '../../../../assets/images/icons/smartWatchIcon.png'
// import cameraIcon from '../../../../assets/images/icons/cameraIcon.png'
// import headphonesIcon from '../../../../assets/images/icons/headphonesIcon.png'
// import computerIcon from '../../../../assets/images/icons/computerIcon.png'
// import gamingIcon from '../../../../assets/images/icons/gamingIcon.png'

import swiperArrowLeft from '../../../../assets/images/icons/swiperArrowLeft.png'
import swiperArrowRight from '../../../../assets/images/icons/swiperArrowRight.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { getCategories, type Category } from '../../../../shared/api/productsApi'

type CategoryItem = {
  id: string
  icon: string
  title: string
}

// const fallbackCategories: CategoryItem[] = [
//   { id: 'phones', icon: phoneIcon, title: 'Phones' },
//   { id: 'smart-watches', icon: smartWatchIcon, title: 'Smart Watches' },
//   { id: 'cameras', icon: cameraIcon, title: 'Cameras' },
//   { id: 'headphones', icon: headphonesIcon, title: 'Headphones' },
//   { id: 'computers', icon: computerIcon, title: 'Computers' },
//   { id: 'gaming', icon: gamingIcon, title: 'Gaming' },
// ]

const CategoriesSection = () => {
  const [apiCategories, setApiCategories] = useState<Category[]>([])

  useEffect(() => {
    let isMounted = true
    getCategories()
      .then((data) => {
        if (!isMounted) return
        setApiCategories(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!isMounted) return
        setApiCategories([])
      })

    return () => {
      isMounted = false
    }
  }, [])

  const resolvedCategories: CategoryItem[] = useMemo(() => {
    if (apiCategories.length > 0) {
      return apiCategories.map((c) => ({
        id: c.id,
        title: c.title,
        icon: c.icon,
      }))
    }
    return []
  }, [apiCategories])

  const loopedCategories: CategoryItem[] = useMemo(() => {
    if (resolvedCategories.length === 0) return []
    return [...resolvedCategories, ...resolvedCategories]
  }, [resolvedCategories])

  return (
    <section className="categoriesSection">
      <div className="container">
        <div className="categoriesSectionHeader">
          <SectionTitle title="Browse By Category" />
          <div className="categoriesSectionNav">
            <button
              type="button"
              className="categoriesNavBtn categories-prev"
              aria-label="Previous categories"
            >
              <img src={swiperArrowLeft} alt="" width={32} height={32} />
            </button>
            <button
              type="button"
              className="categoriesNavBtn categories-next"
              aria-label="Next categories"
            >
              <img src={swiperArrowRight} alt="" width={32} height={32} />
            </button>
          </div>
        </div>

        {loopedCategories.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            spaceBetween={30}
            loop={true}
            speed={600}
            centeredSlides={false}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            navigation={{
              prevEl: '.categories-prev',
              nextEl: '.categories-next',
            }}
            className="categoriesSwiper"
          >
            {loopedCategories.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`} className="categoriesSlide">
                <CategorieCard id={item.id} icon={item.icon} title={item.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </section>
  )
}

export default CategoriesSection
