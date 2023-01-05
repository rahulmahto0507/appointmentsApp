import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      titles: titleInput,
      dates: dateInput,
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isLiked === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="appointment-inputs">
            <form className="form" onSubmit={this.onAddAppointment}>
              <label className="title" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                className="title-input"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="date-input"
                onChange={this.onChangeDate}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="sub-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsLiked={this.toggleIsLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
