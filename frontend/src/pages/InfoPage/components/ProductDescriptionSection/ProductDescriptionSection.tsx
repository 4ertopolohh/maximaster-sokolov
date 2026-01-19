import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import ViewMoreButton from '../../../../components/ViewMoreButton/ViewMoreButton';
import DescriptionSectionDetails from '../DescriptionSectionDetails/DescriptionSectionDetails';
import ProductDescriptionCharacteristicsList from '../ProductDescriptionCharacteristicsList/ProductDescriptionCharacteristicsList';
import '../ProductDescriptionSection/ProductDescriptionSection.scss';

export type ProductDescriptionCharacteristicValue = string | string[];

export type ProductDescriptionCharacteristicItem = {
  title: string;
  value: ProductDescriptionCharacteristicValue;
};

export type ProductDescriptionCharacteristicData = {
  title: string;
  items: ProductDescriptionCharacteristicItem[];
};

type ProductDescriptionSectionProps = {
  detailsTitle: string;
  detailsDesc: string;
  characteristics: ProductDescriptionCharacteristicData[];
};

const COLLAPSED_CONTAINER_HEIGHT = 830;
const FALLBACK_BUTTON_HEIGHT = 48;

const ProductDescriptionSection = ({
  detailsTitle,
  detailsDesc,
  characteristics,
}: ProductDescriptionSectionProps) => {
  /*
    return(
        <section className='productDescriptionSection'>
            <div className='container'>
                <DescriptionSectionDetails 
                    title='Details'
                    desc="Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many."
                />
                <ProductDescriptionCharacteristicsList />
            </div>
        </section>
    )
    */

  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);
  const [collapsedContentMaxHeight, setCollapsedContentMaxHeight] = useState<number>(0);
  const [expandedContentMaxHeight, setExpandedContentMaxHeight] = useState<number>(0);

  const recalc = () => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const style = window.getComputedStyle(container);

    const paddingTop = Number.isFinite(Number.parseFloat(style.paddingTop))
      ? Number.parseFloat(style.paddingTop)
      : 0;

    const paddingBottom = Number.isFinite(Number.parseFloat(style.paddingBottom))
      ? Number.parseFloat(style.paddingBottom)
      : 0;

    const rowGapRaw = style.rowGap && style.rowGap !== 'normal' ? style.rowGap : style.gap;
    const rowGap = Number.isFinite(Number.parseFloat(rowGapRaw)) ? Number.parseFloat(rowGapRaw) : 0;

    const collapsedMax = Math.max(
      0,
      COLLAPSED_CONTAINER_HEIGHT - paddingTop - paddingBottom - rowGap - FALLBACK_BUTTON_HEIGHT,
    );

    const expandedMax = content.scrollHeight;

    setCollapsedContentMaxHeight(collapsedMax);
    setExpandedContentMaxHeight(expandedMax);

    const canCollapse = expandedMax > collapsedMax + 1;

    setIsCollapsible(canCollapse);
    if (!canCollapse) {
      setIsExpanded(false);
    }
  };

  useLayoutEffect(() => {
    recalc();

    const onResize = () => recalc();
    window.addEventListener('resize', onResize);

    let ro: ResizeObserver | null = null;
    if (contentRef.current) {
      ro = new ResizeObserver(() => recalc());
      ro.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
  }, [detailsTitle, detailsDesc, characteristics]);

  const contentStyle = useMemo<CSSProperties | undefined>(() => {
    if (!isCollapsible) return undefined;

    const maxHeight = isExpanded ? expandedContentMaxHeight : collapsedContentMaxHeight;

    return {
      maxHeight: `${maxHeight}px`,
    };
  }, [collapsedContentMaxHeight, expandedContentMaxHeight, isCollapsible, isExpanded]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className="productDescriptionSection">
      <div className="container" ref={containerRef}>
        <div
          ref={contentRef}
          className={`productDescriptionSection__content${isCollapsible ? ' isCollapsible' : ''}${isExpanded ? ' isExpanded' : ''}`}
          style={contentStyle}
        >
          <DescriptionSectionDetails title={detailsTitle} desc={detailsDesc} />
          <ProductDescriptionCharacteristicsList characteristics={characteristics} />
        </div>

        {isCollapsible && <ViewMoreButton isExpanded={isExpanded} onClick={handleToggle} />}
      </div>
    </section>
  );
};

export default ProductDescriptionSection;
