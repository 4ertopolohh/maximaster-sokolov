import '../ProcessorGraphInfoBlock/ProcessorGraphInfoBlock.scss'

export type ProcessorGraphInfoBlockProps = {
    title: string
    value: string
}

const ProcessorGraphInfoBlock = ({ title, value }:ProcessorGraphInfoBlockProps) => {
    return(
        <div className='processorGraphInfoBlock'>
            <h6 className='processorGraphInfoBlockTitle'>{title}</h6>
            <p className='processorGraphInfoBlockValue'>{value}</p>
        </div>
    )
}

export default ProcessorGraphInfoBlock;