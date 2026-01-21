import { type MouseEventHandler } from 'react'
import '../TableProductsUpdateButton/TableProductsUpdateButton.scss'

export type TableProductsUpdateButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const TableProductsUpdateButton = ({ onClick }: TableProductsUpdateButtonProps) => {
    return (
        <button type="button" className="tableProductsUpdateButton" onClick={onClick}>
            Обновить
        </button>
    )
}

export default TableProductsUpdateButton
