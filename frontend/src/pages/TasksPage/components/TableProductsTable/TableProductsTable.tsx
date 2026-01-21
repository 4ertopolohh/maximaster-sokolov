import '../TableProductsTable/TableProductsTable.scss'

export type ProductRow = {
    name: string
    qty: number
    price: number
}

export type TableProductsTableProps = {
    rows: ProductRow[]
}

const TableProductsTable = ({ rows }: TableProductsTableProps) => {
    return (
        <table className="tableProductsTable">
            <thead className="tableHead">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Название</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Цена за единицу</th>
                    <th scope="col">Сумма</th>
                </tr>
            </thead>
            <tbody className="tableBody">
                {rows.map((row, index) => {
                    const id = index + 1
                    const sum = row.qty * row.price

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{row.name}</td>
                            <td>{row.qty}</td>
                            <td>{row.price}</td>
                            <td>{sum}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableProductsTable
