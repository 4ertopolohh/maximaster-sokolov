import { type ChangeEvent } from 'react'
import '../PlacingAnOrderInputEmail/PlacingAnOrderInputEmail.scss'

export type PlacingAnOrderInputEmailProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
}

const PlacingAnOrderInputEmail = ({ value, onChange, hasError }: PlacingAnOrderInputEmailProps) => {
    return (
        <input
            type="text"
            className={`placingAnOrderInputField${hasError ? ' placingAnOrderInputFieldError' : ''}`}
            id="placingAnOrderInputEmail"
            placeholder="Email"
            value={value}
            onChange={onChange}
            inputMode="email"
            autoComplete="email"
        />
    )
}

export default PlacingAnOrderInputEmail
