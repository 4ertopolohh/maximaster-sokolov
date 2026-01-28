import { Link } from 'react-router-dom';

import '../CategorieCard/CategorieCard.scss';
import { ROUTES } from '../../../../shared/routes';

export type CategorieCardProps = {
    id: string;
    icon: string;
    title: string;
};

const CategorieCard = ({ id, icon, title }: CategorieCardProps) => {
    return (
        <Link
            className="categorieCard"
            to={ROUTES.catalog}
            state={{ categoryId: id, categoryTitle: title }}
        >
            <img src={icon} alt="" loading="lazy" />
            <h3>{title}</h3>
        </Link>
    );
};

export default CategorieCard;
