import type { CSSProperties } from 'react'
import '../SelectColorButton/SelectColorButton.scss'

export type SelectColorButtonProps = {
  color: string
  isActive?: boolean
  onClick: (color: string) => void
}

const SelectColorButton = ({ color, isActive, onClick }: SelectColorButtonProps) => {
  const SelectColorButtonStyle: CSSProperties = {
    backgroundColor: color,
  }

  const handleClick = () => {
    onClick(color)
  }

  return (
    <button
      type="button"
      className={`selectColorButton${isActive ? ' selectColorButton--active' : ''}`}
      style={SelectColorButtonStyle}
      onClick={handleClick}
      aria-pressed={Boolean(isActive)}
    ></button>
  )
}

export default SelectColorButton
