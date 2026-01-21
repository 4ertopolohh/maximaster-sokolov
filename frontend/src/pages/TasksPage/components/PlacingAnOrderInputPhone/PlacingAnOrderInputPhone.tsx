import { type ChangeEvent } from 'react'
import '../PlacingAnOrderInputPhone/PlacingAnOrderInputPhone.scss'

export type PlacingAnOrderInputPhoneProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
}

const PlacingAnOrderInputPhone = ({ value, onChange, hasError }: PlacingAnOrderInputPhoneProps) => {
    return (
        <input
            type="tel"
            name=""
            id="placingAnOrderInputPhone"
            className={`placingAnOrderInputField${hasError ? ' placingAnOrderInputFieldError' : ''}`}
            placeholder="Телефон"
            value={value}
            onChange={onChange}
            inputMode="numeric"
            maxLength={11}
        />
    )
}

export default PlacingAnOrderInputPhone
