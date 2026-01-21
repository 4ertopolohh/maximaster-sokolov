import { type ChangeEventHandler } from 'react'
import '../TableProductsFilterInput/TableProductsFilterInput.scss'

export type TableProductsFilterInputProps = {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    placeholder: string
    hasError: boolean
}

const TableProductsFilterInput = ({ value, onChange, placeholder, hasError }: TableProductsFilterInputProps) => {
    return (
        <input
            type="text"
            className={`tableProductsFilterInput${hasError ? ' tableProductsFilterInputError' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            inputMode="numeric"
        />
    )
}

export default TableProductsFilterInput
