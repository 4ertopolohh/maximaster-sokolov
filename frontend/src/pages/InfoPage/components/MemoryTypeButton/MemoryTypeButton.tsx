import '../MemoryTypeButton/MemoryTypeButton.scss'

export type MemoryTypeButtonProps = {
  memory: string
  isActive: boolean
  isDisabled?: boolean
  onClick: (memory: string) => void
}

const MemoryTypeButton = ({ memory, isActive, isDisabled, onClick }: MemoryTypeButtonProps) => {
  const className = `memoryTypeButton${isActive ? ' memoryTypeButton--active' : ''}${
    isDisabled ? ' memoryTypeButton--disabled' : ''
  }`

  const handleClick = () => {
    if (isDisabled) return
    onClick(memory)
  }

  return (
    <button type="button" className={className} onClick={handleClick} disabled={isDisabled}>
      {memory}
    </button>
  )
}

export default MemoryTypeButton
