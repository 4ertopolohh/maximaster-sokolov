import { useState, type ChangeEvent } from 'react'
import '../PlacingAnOrderInputComment/PlacingAnOrderInputComment.scss'

const PlacingAnOrderInputComment = () => {
    const [comment, setComment] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    return (
        <div className='inputCommentWrapper'>
            <textarea
                className="placingAnOrderInputField"
                id="placingAnOrderInputComment"
                placeholder="Комментарий к заказу (макс. 500 символов)"
                maxLength={500}
                value={comment}
                onChange={handleChange}
            />
            <div className="counterComment">{comment.length} из 500</div>
        </div>
    )
}

export default PlacingAnOrderInputComment