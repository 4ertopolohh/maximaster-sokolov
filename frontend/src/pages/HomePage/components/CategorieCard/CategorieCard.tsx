import { Link } from 'react-router-dom';

import '../CategorieCard/CategorieCard.scss';
import { ROUTES } from '../../../../shared/routes';

export type CategorieCardProps = {
    icon: string;
    title: string;
};

const CategorieCard = ({ icon, title }: CategorieCardProps) => {
    return (
        <Link
            className="categorieCard"
            to={ROUTES.catalog}
            state={{ category: title }}
        >
            <img src={icon} alt="" loading="lazy" />
            <h3>{title}</h3>
        </Link>
    );
};

export default CategorieCard;
