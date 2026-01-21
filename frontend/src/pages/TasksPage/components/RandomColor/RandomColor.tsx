import { useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../RandomColor/RandomColor.scss'
import RandomColorButton from '../RandomColorButton/RandomColorButton'
import RandomColorInputField from '../RandomColorInputField/RandomColorInputField'
import RandomColorRectangle from '../RandomColorRectangle/RandomColorRectangle'

const RandomColor = () => {
  const [rectangleWidth, setRectangleWidth] = useState<number>(100)
  const [rectangleHeight, setRectangleHeight] = useState<number>(100)
  const [rectangleColor, setRectangleColor] = useState<string>('rgba(0, 0, 0, 0)')

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = 70
    const lightness = 60
    return `hsl(${hue} ${saturation}% ${lightness}%)`
  }

  const handleRandomColorClick = () => {
    setRectangleColor(generateRandomColor())
  }

  return (
    <section className="randomColor">
      <div className="container">
        <SectionTitle title="Случайный цвет" />
        <div className="taskWrapper">
          <RandomColorInputField title="Ширина" value={rectangleWidth} onChange={setRectangleWidth} />
          <RandomColorInputField title="Высота" value={rectangleHeight} onChange={setRectangleHeight} />
          <RandomColorRectangle width={rectangleWidth} height={rectangleHeight} color={rectangleColor} />
          <RandomColorButton onClick={handleRandomColorClick} />
        </div>
      </div>
    </section>
  )
}

export default RandomColor
