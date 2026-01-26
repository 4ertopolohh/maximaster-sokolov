import { type ChangeEvent, type CSSProperties } from 'react'
import '../ExelTable/ExelTable.scss'

export type ExelTableProps = {
  rowsCount: number
  colsCount: number
  cells: Record<string, string>
  onCellChange: (row: number, col: number, value: string) => void
  cellWidth: number
}

type ExelTableStyle = CSSProperties & {
  ['--exel-cell-width']?: string
}

const cellKey = (row: number, col: number) => `r${row}c${col}`

const ExelTable = ({ rowsCount, colsCount, cells, onCellChange, cellWidth }: ExelTableProps) => {
  const handleChange = (row: number, col: number) => (e: ChangeEvent<HTMLInputElement>) => {
    onCellChange(row, col, e.target.value)
  }

  const tableStyle: ExelTableStyle = {
    ['--exel-cell-width']: `${cellWidth}px`,
  }

  return (
    <table className="exelTable" style={tableStyle}>
      <tbody>
        {Array.from({ length: rowsCount }).map((_, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {Array.from({ length: colsCount }).map((__, colIndex) => {
              const key = cellKey(rowIndex, colIndex)
              const value = cells[key] ?? ''

              return (
                <td key={`cell-${rowIndex}-${colIndex}`} className="exelCell">
                  <input
                    className="exelCellInput"
                    type="text"
                    value={value}
                    onChange={handleChange(rowIndex, colIndex)}
                  />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ExelTable
