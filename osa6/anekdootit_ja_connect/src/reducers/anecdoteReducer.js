import anecdoteService from '../services/anecdotes'

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({   
       type: 'NEW_ANECDOTE',
       data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = anecdote
    newAnecdote.votes = newAnecdote.votes + 1
    const response = await anecdoteService.voteAnecdote(newAnecdote)
    dispatch({    
      type: 'VOTE_ANECDOTE',
      data:  response 
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({    
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return[...state, action.data]

    case 'VOTE_ANECDOTE':
      const anecDoteToVote = state.find(a => a.id === action.data.id)
      let newState = state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : anecDoteToVote )
      newState.sort(function(a,b){
        return b.votes - a.votes
      })
      return newState

      case 'INIT_ANECDOTES':
        let arrangedAnecdotes = action.data
        arrangedAnecdotes.sort(function(a,b){
          return b.votes - a.votes
        })
        return arrangedAnecdotes

    default: 
    return state
  }
}

export default reducer