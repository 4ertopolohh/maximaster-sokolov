import '../TableProductsFilter/TableProductsFilter.scss'
import { type ChangeEventHandler } from 'react'
import TableProductsFilterInput from '../TableProductsFilterInput/TableProductsFilterInput'
import TableProductsUpdateButton from '../TableProductsUpdateButton/TableProductsUpdateButton'

export type TableProductsFilterProps = {
    minValue: string
    maxValue: string
    onMinChange: ChangeEventHandler<HTMLInputElement>
    onMaxChange: ChangeEventHandler<HTMLInputElement>
    onApply: () => void
    minHasError: boolean
    maxHasError: boolean
    warningText: string
}

const TableProductsFilter = ({
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    onApply,
    minHasError,
    maxHasError,
    warningText,
}: TableProductsFilterProps) => {
    return (
        <div className="tableProductsFilter">
            <span>Цена от:</span>
            <TableProductsFilterInput value={minValue} onChange={onMinChange} placeholder="100" hasError={minHasError} />
            <span>до:</span>
            <TableProductsFilterInput value={maxValue} onChange={onMaxChange} placeholder="5000" hasError={maxHasError} />
            <TableProductsUpdateButton onClick={onApply} />
            {warningText ? <div className="tableProductsFilterWarning">{warningText}</div> : null}
        </div>
    )
}

export default TableProductsFilter
