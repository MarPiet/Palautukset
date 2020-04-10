
export const changeFilter = (filter) => {
    return{
        type: 'CHANGE_FILTER',
        data: filter 
    }
}


const reducer = (state = '', action) => {
    switch (action.type) {
      case 'CHANGE_FILTER':
        return action.data
      default:
        return state
    }
  }

  export default reducer