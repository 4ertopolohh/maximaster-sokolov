import '../CatalogPageSlide/CatalogPageSlide.scss';

export type CatalogPageSlideProps = {
    number: string;
    isActive?: boolean;
    onClick?: () => void;
};

const CatalogPageSlide = ({ number, isActive = false, onClick }: CatalogPageSlideProps) => {
    return (
        <button
            type="button"
            className={`catalogPageSlide${isActive ? ' isActive' : ''}${number === '....' ? ' isEllipsis' : ''}`}
            onClick={onClick}
        >
            {number}
        </button>
    );
};

export default CatalogPageSlide;
