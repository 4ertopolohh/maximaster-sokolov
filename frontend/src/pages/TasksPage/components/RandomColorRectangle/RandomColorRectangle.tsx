import '../RandomColorRectangle/RandomColorRectangle.scss'

export type RandomColorRectangleProps = {
  width: number
  height: number
  color: string
}

const RandomColorRectangle = ({ width, height, color }: RandomColorRectangleProps) => {
  return (
    <div
      className="randomColorRectangle"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
      }}
    ></div>
  )
}

export default RandomColorRectangle
