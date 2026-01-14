import '../InDevSection/InDevSection.scss'

export type InDevSectionProps = {
    sectionName: string
}

const InDevSection = ( { sectionName }:InDevSectionProps ) => {
    return(
        <section className='inDevSection'>
            <div className='container'>
                <h1>{sectionName} page</h1>
                <h3>In development...</h3>
            </div>
        </section>
    )
}

export default InDevSection;