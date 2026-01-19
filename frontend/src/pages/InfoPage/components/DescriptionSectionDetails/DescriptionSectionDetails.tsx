import '../DescriptionSectionDetails/DescriptionSectionDetails.scss'

export type DescriptionSectionDetailsProps = {
    title: string
    desc: string
}

const DescriptionSectionDetails = ({ title, desc }:DescriptionSectionDetailsProps) => {
    return(
        <div className='descriptionSectionDetails'>
            <h3 className='descriptionSectionDetailsTitle'>{title}</h3>
            <p className='descriptionSectionDetailsDesc'>{desc}</p>
        </div>
    )
}

export default DescriptionSectionDetails;