import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import CategorieCard from '../CategorieCard/CategorieCard';
import '../CategoriesSection/CategoriesSection.scss';

import phoneIcon from '../../../../assets/images/icons/phoneIcon.png';
import smartWatchIcon from '../../../../assets/images/icons/smartWatchIcon.png';
import cameraIcon from '../../../../assets/images/icons/cameraIcon.png';
import headphonesIcon from '../../../../assets/images/icons/headphonesIcon.png';
import computerIcon from '../../../../assets/images/icons/computerIcon.png';
import gamingIcon from '../../../../assets/images/icons/gamingIcon.png';

import swiperArrowLeft from '../../../../assets/images/icons/swiperArrowLeft.png';
import swiperArrowRight from '../../../../assets/images/icons/swiperArrowRight.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

type CategoryItem = {
  icon: string;
  title: string;
};

const categories: CategoryItem[] = [
  { icon: phoneIcon, title: 'Phones' },
  { icon: smartWatchIcon, title: 'Smart Watches' },
  { icon: cameraIcon, title: 'Cameras' },
  { icon: headphonesIcon, title: 'Headphones' },
  { icon: computerIcon, title: 'Computers' },
  { icon: gamingIcon, title: 'Gaming' },
];

const loopedCategories: CategoryItem[] = [...categories, ...categories];

const CategoriesSection = () => {
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
            <SwiperSlide key={`${item.title}-${index}`} className="categoriesSlide">
              <CategorieCard icon={item.icon} title={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesSection;
