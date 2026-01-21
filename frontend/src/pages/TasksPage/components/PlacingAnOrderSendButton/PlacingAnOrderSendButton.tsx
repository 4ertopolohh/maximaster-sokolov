import { type MouseEventHandler } from 'react'
import '../PlacingAnOrderSendButton/PlacingAnOrderSendButton.scss'

export type PlacingAnOrderSendButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const PlacingAnOrderSendButton = ({ onClick }: PlacingAnOrderSendButtonProps) => {
    return (
        <button type="button" className="placingAnOrderSendButton" onClick={onClick}>
            Отправить
        </button>
    )
}

export default PlacingAnOrderSendButton
