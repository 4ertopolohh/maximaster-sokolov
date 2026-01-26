import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../Exel/Exel.scss'
import ExelButtonColumn from '../ExelButtonColumn/ExelButtonColumn'
import ExelButtonRow from '../ExelButtonRow/ExelButtonRow'
import ExelTable from '../ExelTable/ExelTable'

type CellsMap = Record<string, string>

type StoredSpreadsheet = {
  rows: number
  cols: number
  cells: CellsMap
}

const STORAGE_KEY = 'tasks_spreadsheet_v1'
const DEFAULT_ROWS = 4
const DEFAULT_COLS = 4
const DEFAULT_CELL_WIDTH = 150
const MIN_CELL_WIDTH = 40

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isStoredSpreadsheet = (value: unknown): value is StoredSpreadsheet => {
  if (!isPlainObject(value)) return false
  if (typeof value.rows !== 'number' || !Number.isFinite(value.rows)) return false
  if (typeof value.cols !== 'number' || !Number.isFinite(value.cols)) return false
  if (!isPlainObject(value.cells)) return false

  for (const v of Object.values(value.cells)) {
    if (typeof v !== 'string') return false
  }

  return true
}

const cellKey = (row: number, col: number) => `r${row}c${col}`

const parseCellKey = (key: string): { row: number; col: number } | null => {
  const match = /^r(\d+)c(\d+)$/.exec(key)
  if (!match) return null
  const row = Number(match[1])
  const col = Number(match[2])
  if (!Number.isFinite(row) || !Number.isFinite(col)) return null
  return { row, col }
}

const filterCellsToBounds = (cells: CellsMap, rows: number, cols: number): CellsMap => {
  const next: CellsMap = {}

  for (const [k, v] of Object.entries(cells)) {
    const parsed = parseCellKey(k)
    if (!parsed) continue
    if (parsed.row >= rows) continue
    if (parsed.col >= cols) continue
    next[k] = v
  }

  return next
}

const hasDataInLastColumn = (cells: CellsMap, rows: number, colIndex: number) => {
  for (let r = 0; r < rows; r += 1) {
    const v = cells[cellKey(r, colIndex)]
    if (typeof v === 'string' && v.trim().length > 0) return true
  }
  return false
}

const hasDataInLastRow = (cells: CellsMap, cols: number, rowIndex: number) => {
  for (let c = 0; c < cols; c += 1) {
    const v = cells[cellKey(rowIndex, c)]
    if (typeof v === 'string' && v.trim().length > 0) return true
  }
  return false
}

const parseGapPx = (value: string) => {
  const num = Number.parseFloat(value)
  return Number.isFinite(num) ? num : 0
}

const Exel = () => {
  const [rowsCount, setRowsCount] = useState<number>(DEFAULT_ROWS)
  const [colsCount, setColsCount] = useState<number>(DEFAULT_COLS)
  const [cells, setCells] = useState<CellsMap>({})
  const [cellWidth, setCellWidth] = useState<number>(DEFAULT_CELL_WIDTH)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  const tableWrapperRef = useRef<HTMLDivElement | null>(null)
  const columnButtonsRef = useRef<HTMLDivElement | null>(null)

  const computeCellWidthForCols = (nextColsCount: number) => {
    const wrapper = tableWrapperRef.current
    const buttons = columnButtonsRef.current
    if (!wrapper || !buttons) return null

    const wrapperWidth = wrapper.clientWidth
    const buttonsWidth = buttons.offsetWidth

    const style = window.getComputedStyle(wrapper)
    const columnGap = style.columnGap !== 'normal' ? style.columnGap : style.gap
    const gapPx = parseGapPx(columnGap)

    const availableForTable = wrapperWidth - buttonsWidth - gapPx
    if (!Number.isFinite(availableForTable) || availableForTable <= 0) return null

    const bordersTotal = (nextColsCount - 1) + 2
    const availableForInputs = availableForTable - bordersTotal
    const raw = Math.floor(availableForInputs / nextColsCount)

    const next = Math.min(DEFAULT_CELL_WIDTH, Math.max(MIN_CELL_WIDTH, raw))
    return next
  }

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      setIsHydrated(true)
      return
    }

    try {
      const parsed: unknown = JSON.parse(raw)
      if (!isStoredSpreadsheet(parsed)) {
        setIsHydrated(true)
        return
      }

      const safeRows = Math.max(1, Math.floor(parsed.rows))
      const safeCols = Math.max(1, Math.floor(parsed.cols))
      const safeCells = filterCellsToBounds(parsed.cells, safeRows, safeCols)

      setRowsCount(safeRows)
      setColsCount(safeCols)
      setCells(safeCells)
      setIsHydrated(true)
    } catch {
      setIsHydrated(true)
      return
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const payload: StoredSpreadsheet = {
      rows: rowsCount,
      cols: colsCount,
      cells,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [cells, colsCount, rowsCount, isHydrated])

  useLayoutEffect(() => {
    const wrapper = tableWrapperRef.current
    if (!wrapper) return

    const compute = () => {
      const next = computeCellWidthForCols(colsCount)
      if (next === null) return
      setCellWidth((prev) => (prev === next ? prev : next))
    }

    compute()

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        compute()
      })
      ro.observe(wrapper)
    }

    const onResize = () => {
      compute()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (ro) {
        ro.disconnect()
      }
    }
  }, [colsCount])

  const onCellChange = (row: number, col: number, value: string) => {
    const key = cellKey(row, col)
    setCells((prev) => ({ ...prev, [key]: value }))
  }

  const addColumn = () => {
    const nextCols = colsCount + 1
    const nextWidth = computeCellWidthForCols(nextCols)
    if (nextWidth !== null) {
      setCellWidth(nextWidth)
    }
    setColsCount(nextCols)
  }

  const removeColumn = () => {
    if (colsCount <= 1) return

    const lastColIndex = colsCount - 1
    const hasData = hasDataInLastColumn(cells, rowsCount, lastColIndex)

    if (hasData) {
      const ok = window.confirm('В удаляемом столбце есть данные. Удалить столбец?')
      if (!ok) return
    }

    const nextCols = colsCount - 1
    const nextWidth = computeCellWidthForCols(nextCols)
    if (nextWidth !== null) {
      setCellWidth(nextWidth)
    }
    setColsCount(nextCols)
    setCells((prev) => filterCellsToBounds(prev, rowsCount, nextCols))
  }

  const addRow = () => {
    setRowsCount((prev) => prev + 1)
  }

  const removeRow = () => {
    if (rowsCount <= 1) return

    const lastRowIndex = rowsCount - 1
    const hasData = hasDataInLastRow(cells, colsCount, lastRowIndex)

    if (hasData) {
      const ok = window.confirm('В удаляемой строке есть данные. Удалить строку?')
      if (!ok) return
    }

    const nextRows = rowsCount - 1
    setRowsCount(nextRows)
    setCells((prev) => filterCellsToBounds(prev, nextRows, colsCount))
  }

  const canRemoveColumn = useMemo(() => colsCount > 1, [colsCount])
  const canRemoveRow = useMemo(() => rowsCount > 1, [rowsCount])

  return (
    <section className="exel">
      <div className="container">
        <SectionTitle title="Электронная таблица" />
        <div className="taskWrapper">
          <div className="tableWrapper" ref={tableWrapperRef}>
            <ExelTable
              rowsCount={rowsCount}
              colsCount={colsCount}
              cells={cells}
              onCellChange={onCellChange}
              cellWidth={cellWidth}
            />
            <div className="addColumnButtons" ref={columnButtonsRef}>
              <ExelButtonColumn value="+" onClick={addColumn} />
              <ExelButtonColumn value="-" onClick={canRemoveColumn ? removeColumn : undefined} />
            </div>
          </div>
          <div className="addRowButtons">
            <ExelButtonRow value="+" onClick={addRow} />
            <ExelButtonRow value="-" onClick={canRemoveRow ? removeRow : undefined} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Exel
