import '../CategorieCard/CategorieCard.scss'

export type CategorieCardProps = {
    icon: string
    title: string
}

const CategorieCard = ({ icon, title }:CategorieCardProps) => {
    return(
        <div className='categorieCard'>
            <img src={icon} alt="" loading='lazy'/>
            <h3>{title}</h3>
        </div>
    )
}

export default CategorieCard;