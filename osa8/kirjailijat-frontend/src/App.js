import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'
import { useQuery, useLazyQuery, useApolloClient, useSubscription } from '@apollo/client'

import { ALL_AUTHORS, BOOK_ADDED } from './queries'
import { USER } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)  
  const userResult = useQuery(USER)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('user-token')
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, []) 

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const [favGenreBooks, {called, loading, data}] =  useLazyQuery(ALL_BOOKS)

  if(called && loading){
    return <div>loading...</div>
  }

if (authorResult.loading)  {
    return <div>loading...</div>
  }
if (bookResult.loading)  {
    return <div>loading...</div>
  }
if (userResult.loading)  {
    return <div>loading...</div>
  }
const recommendedPage = () => {
  setPage('recommended')
  favGenreBooks({ variables: {genre: userResult.data.me.favoriteGenre}})
}

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null
        ?<>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={recommendedPage}>recommended</button>
        <button onClick={logout}>logout</button>
        </>
        :<button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors
        show={page === 'authors'} authors={authorResult.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={bookResult.data.allBooks}
      />

      <RecommendedBooks
        show={page === 'recommended'} books={data}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken}
      />
    

    </div>
  )
}

export default App