import '../RandomColorButton/RandomColorButton.scss'

export type RandomColorButtonProps = {
  onClick: () => void
}

const RandomColorButton = ({ onClick }: RandomColorButtonProps) => {
  return (
    <button className="randomColorButton" type="button" onClick={onClick}>
      Случайный цвет
    </button>
  )
}

export default RandomColorButton
