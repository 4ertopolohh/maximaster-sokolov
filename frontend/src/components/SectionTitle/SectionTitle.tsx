import '../SectionTitle/SectionTitle.scss'

export type SectionTitleProps = {
    title: string
}

const SectionTitle = ({ title }:SectionTitleProps) => {
    return(
        <h3 className='sectionTitle'>{title}</h3>
    )
}

export default SectionTitle;