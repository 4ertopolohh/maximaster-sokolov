import '../MoreButton/MoreButton.scss'

export type MoreButtonProps = {
  label?: string
  onClick?: () => void
}

const MoreButton = ({ label = 'more...', onClick }: MoreButtonProps) => {
  return (
    <button type="button" className="moreButton" onClick={onClick}>
      {label}
    </button>
  )
}

export default MoreButton
