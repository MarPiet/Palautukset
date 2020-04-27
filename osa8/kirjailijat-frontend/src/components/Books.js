import React, {useState, useEffect} from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const [genreBooks, {called, loading, data}] =  useLazyQuery(ALL_BOOKS, {variables: {genre: genre}})
  const allBooks = props.books

  useEffect(() => {
      genreBooks()
  }, [genre, genreBooks]) 


  if (!props.show) {
    return null
  }

  if(called && loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      in genre <span style={{fontWeight:'bold', fontSize:'20px'}} >{genre || 'all genres'}</span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genre !== 'all genres'
          ? data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          : allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button value="refactoring" onClick={({ target }) => setGenre(target.value)}>refactoring</button>
      <button value="agile" onClick={({ target }) => setGenre(target.value)}>agile</button>
      <button value="patterns" onClick={({ target }) => setGenre(target.value)}>patterns</button>
      <button value="design" onClick={({ target }) => setGenre(target.value)}>design</button>
      <button value="crime" onClick={({ target }) => setGenre(target.value)}>crime</button>
      <button value="classic" onClick={({ target }) => setGenre(target.value)}>classic</button>
      <button value="all genres" onClick={({ target }) => setGenre(target.value)}>all genres</button>
    </div>
  )
}

export default Books