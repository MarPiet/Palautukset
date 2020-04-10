
export const emptyNotification = () => {
    return{
        type: 'EMPTY'
    }
}

let timeoutId = 0
export const setNotification = (notification, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch({
                type: 'EMPTY'
            })
        }, time*1000)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
    }
}


const reducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'EMPTY':
          return ''
      default:
        return state
    }
  }

  export default reducer