import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../TableProducts/TableProducts.scss'
import TableProductsFilter from '../TableProductsFilter/TableProductsFilter'
import TableProductsTable, { type ProductRow } from '../TableProductsTable/TableProductsTable'
import productsDataRaw from '../../../../shared/tableProducts.json'

const rows: ProductRow[] = [
    { name: 'Товар', qty: 15, price: 2000 },
    { name: 'Продукт', qty: 20, price: 5000 },
    { name: 'Предложение', qty: 1, price: 12000 },
    { name: 'Услуга', qty: 1, price: 1000 },
]

type Range = {
    min: number | null
    max: number | null
}

type RangeErrors = {
    min: boolean
    max: boolean
}

type ServiceProduct = {
    price: number
    quantity: number
    name: string
}

const isServiceProduct = (value: unknown): value is ServiceProduct => {
    if (typeof value !== 'object' || value === null) return false
    const record = value as Record<string, unknown>

    return (
        typeof record.name === 'string' &&
        typeof record.price === 'number' &&
        Number.isFinite(record.price) &&
        typeof record.quantity === 'number' &&
        Number.isFinite(record.quantity)
    )
}

const parseNonNegativeInt = (value: string) => {
    const trimmed = value.trim()
    if (trimmed.length === 0) {
        return { value: null as number | null, isValid: true }
    }
    if (!/^\d+$/.test(trimmed)) {
        return { value: null as number | null, isValid: false }
    }
    const num = Number(trimmed)
    if (!Number.isFinite(num)) {
        return { value: null as number | null, isValid: false }
    }
    return { value: num, isValid: true }
}

const TableProducts = () => {
    const [minInput, setMinInput] = useState<string>('')
    const [maxInput, setMaxInput] = useState<string>('')

    const [appliedRange, setAppliedRange] = useState<Range>({ min: null, max: null })
    const [rangeErrors, setRangeErrors] = useState<RangeErrors>({ min: false, max: false })
    const [rangeWarning, setRangeWarning] = useState<string>('')

    const [dataRows, setDataRows] = useState<ProductRow[]>(rows)

    useEffect(() => {
        const json: unknown = productsDataRaw as unknown
        if (!Array.isArray(json)) {
            setDataRows(rows)
            return
        }

        const normalized: ProductRow[] = []
        for (const item of json) {
            if (!isServiceProduct(item)) {
                setDataRows(rows)
                return
            }

            normalized.push({
                name: item.name,
                qty: item.quantity,
                price: item.price,
            })
        }

        setDataRows(normalized)
    }, [])

    /*
    const PRODUCTS_SERVICE_URL = 'https://exercise.develop.maximaster.ru/service/products/'

    useEffect(() => {
        const controller = new AbortController()

        const load = async () => {
            try {
                const res = await fetch(PRODUCTS_SERVICE_URL, {
                    method: 'GET',
                    signal: controller.signal,
                    headers: { Accept: 'application/json' },
                })

                if (!res.ok) {
                    return
                }

                const json: unknown = await res.json()
                if (!Array.isArray(json)) {
                    return
                }

                const normalized: ProductRow[] = []
                for (const item of json) {
                    if (!isServiceProduct(item)) {
                        return
                    }

                    normalized.push({
                        name: item.name,
                        qty: item.quantity,
                        price: item.price,
                    })
                }

                setDataRows(normalized)
            } catch {
                return
            }
        }

        void load()

        return () => {
            controller.abort()
        }
    }, [])
    */

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMinInput(e.target.value)
        if (rangeErrors.min) {
            setRangeErrors((prev) => ({ ...prev, min: false }))
        }
        if (rangeWarning) {
            setRangeWarning('')
        }
    }

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxInput(e.target.value)
        if (rangeErrors.max) {
            setRangeErrors((prev) => ({ ...prev, max: false }))
        }
        if (rangeWarning) {
            setRangeWarning('')
        }
    }

    const handleApplyFilter = () => {
        const minParsed = parseNonNegativeInt(minInput)
        const maxParsed = parseNonNegativeInt(maxInput)

        const nextErrors: RangeErrors = {
            min: !minParsed.isValid,
            max: !maxParsed.isValid,
        }

        setRangeErrors(nextErrors)

        if (!minParsed.isValid || !maxParsed.isValid) {
            setRangeWarning('Некорректный ввод цены')
            return
        }

        const min = minParsed.value
        const max = maxParsed.value

        if (min !== null && max !== null && min > max) {
            setRangeErrors({ min: true, max: true })
            setRangeWarning('Диапазон цен задан неверно')
            return
        }

        if ((min === null && max === null) || (min === 0 && max === 0)) {
            setAppliedRange({ min: null, max: null })
            setRangeWarning('')
            return
        }

        setAppliedRange({ min, max })
        setRangeWarning('')
    }

    const filteredRows = useMemo(() => {
        const { min, max } = appliedRange
        if (min === null && max === null) return dataRows

        return dataRows.filter((r) => {
            if (min !== null && r.price < min) return false
            if (max !== null && r.price > max) return false
            return true
        })
    }, [appliedRange, dataRows])

    const isFilterActive = appliedRange.min !== null || appliedRange.max !== null
    const shouldShowEmptyMessage = isFilterActive && filteredRows.length === 0

    return (
        <section className="tableProducts">
            <div className="container">
                <SectionTitle title="Таблица товаров" />
                <div className="taskWrapper">
                    <TableProductsFilter
                        minValue={minInput}
                        maxValue={maxInput}
                        onMinChange={handleMinChange}
                        onMaxChange={handleMaxChange}
                        onApply={handleApplyFilter}
                        minHasError={rangeErrors.min}
                        maxHasError={rangeErrors.max}
                        warningText={rangeWarning}
                    />
                    {shouldShowEmptyMessage ? (
                        <p className="noData">Нет данных, попадающих под условие фильтра</p>
                    ) : (
                        <TableProductsTable rows={filteredRows} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default TableProducts
