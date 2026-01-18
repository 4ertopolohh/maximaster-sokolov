import SelectColorButton from '../SelectColorButton/SelectColorButton'
import '../SelectColor/SelectColor.scss'

export type SelectColorProps = {
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
}

const SelectColor = ({ colors, selectedColor, onSelectColor }: SelectColorProps) => {
  return (
    <div className="selectColor">
      {colors.map((color) => (
        <SelectColorButton
          key={color}
          color={color}
          isActive={color === selectedColor}
          onClick={onSelectColor}
        />
      ))}
    </div>
  )
}

export default SelectColor
