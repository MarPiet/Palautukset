import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={ message !== ''
      ? null
      : { display: 'none' }
    } >
      {message}
    </div>
  )
}

export default Notification