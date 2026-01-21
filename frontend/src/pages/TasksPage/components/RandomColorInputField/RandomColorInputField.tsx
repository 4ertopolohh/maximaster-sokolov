import { type ChangeEvent } from 'react'
import '../RandomColorInputField/RandomColorInputField.scss'

export type RandomColorInputFieldProps = {
  title: string
  value: number
  onChange: (value: number) => void
}

const RandomColorInputField = ({ title, value, onChange }: RandomColorInputFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D+/g, '')
    const nextValue = digitsOnly === '' ? 0 : Number(digitsOnly)

    if (Number.isFinite(nextValue)) {
      onChange(nextValue)
    }
  }

  return (
    <div className="randomColorInputField">
      <h5>{title}</h5>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={String(value)}
        placeholder="100"
        onChange={handleChange}
      />
    </div>
  )
}

export default RandomColorInputField
