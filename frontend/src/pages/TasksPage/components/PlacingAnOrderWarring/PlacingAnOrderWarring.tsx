import '../PlacingAnOrderWarring/PlacingAnOrderWarring.scss'

export type PlacingAnOrderWarringStatus = 'error' | 'success'

export type PlacingAnOrderWarringProps = {
    text: string
    status?: PlacingAnOrderWarringStatus
}

const PlacingAnOrderWarring = ({ text, status = 'error' }: PlacingAnOrderWarringProps) => {
    if (!text) return null

    return (
        <p
            className={`placingAnOrderWarring${
                status === 'success' ? ' placingAnOrderWarringSuccess' : ' placingAnOrderWarringError'
            }`}
        >
            {text}
        </p>
    )
}

export default PlacingAnOrderWarring
