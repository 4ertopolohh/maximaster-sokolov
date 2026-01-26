import '../ExelButtonColumn/ExelButtonColumn.scss'

export type ExelButtonColumnProps = {
  value: string
  onClick?: () => void
}

const ExelButtonColumn = ({ value, onClick }: ExelButtonColumnProps) => {
  return (
    <button className="exelButtonColumn" type="button" onClick={onClick} disabled={!onClick}>
      {value}
    </button>
  )
}

export default ExelButtonColumn
