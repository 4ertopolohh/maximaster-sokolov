import { type ChangeEvent } from 'react'
import '../PlacingAnOrderInputName/PlacingAnOrderInputName.scss'

export type PlacingAnOrderInputNameProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
}

const PlacingAnOrderInputName = ({ value, onChange, hasError }: PlacingAnOrderInputNameProps) => {
    return (
        <input
            type="text"
            id="placingAnOrderInputName"
            className={`placingAnOrderInputField${hasError ? ' placingAnOrderInputFieldError' : ''}`}
            placeholder="ФИО"
            value={value}
            onChange={onChange}
        />
    )
}

export default PlacingAnOrderInputName
