import '../ExelButtonRow/ExelButtonRow.scss'

export type ExelButtonRowProps = {
  value: string
  onClick?: () => void
}

const ExelButtonRow = ({ value, onClick }: ExelButtonRowProps) => {
  return (
    <button className="exelButtonRow" type="button" onClick={onClick} disabled={!onClick}>
      {value}
    </button>
  )
}

export default ExelButtonRow
