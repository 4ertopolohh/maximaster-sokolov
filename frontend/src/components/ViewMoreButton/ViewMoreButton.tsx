import '../ViewMoreButton/ViewMoreButton.scss';

import filterArrow from '../../assets/images/icons/filterArrow.png';
import filterArrowReverse from '../../assets/images/icons/filterArrowReverse.png';

type ViewMoreButtonProps = {
  isExpanded?: boolean;
  onClick?: () => void;
};

const ViewMoreButton = ({ isExpanded = false, onClick }: ViewMoreButtonProps) => {
  return (
    <button className="viewMoreButton" type="button" onClick={onClick} aria-expanded={isExpanded}>
      <h5>{isExpanded ? 'Turn' : 'View More'}</h5>
      <img src={isExpanded ? filterArrowReverse : filterArrow} alt="" loading="lazy" />
    </button>
  );
};

export default ViewMoreButton;
