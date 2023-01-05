import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, titles, dates, isLiked} = appointmentDetails
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const postedTime = format(new Date(dates), 'dd MMMM yyyy, EEEE')

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-list-container">
        <div>
          <p className="category">{titles}</p>
          <p className="date-time">Date: {postedTime}</p>
        </div>
        <button
          className="star-btn"
          type="button"
          onClick={onClickLike}
          data-testid="star"
        >
          <img src={likeImageUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
