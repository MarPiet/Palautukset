import loginService from '../services/login'
import blogService from '../services/blogs'

export const setUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logOut = () => {
  return{
    type: 'LOGOUT'
  }
}

export const initLogin = () => {
  return{
    type: 'INIT'
  }
}


const reducer = (state = null, action) => {
  switch (action.type){
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    window.localStorage.removeItem('loggedBlogappUser')
    return null
  case 'INIT':{
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    return user
  }


  default: return state
  }
}

export default reducer