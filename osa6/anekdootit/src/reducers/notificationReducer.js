
export const emptyNotification = () => {
    return{
        type: 'EMPTY'
    }
}

export const voteNotification = (anecdote) => {
    return{
        type: 'VOTE_ANECDOTE',
        data: { anecdote }
    }
}

export const createNotification = (anecdote) => {
    return{
        type: 'NEW_ANECDOTE',
        data: {
            content: anecdote
        }
    }
}

export const setNotification = (notification, time) => {
    return async dispatch => {
        setTimeout(() => {
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