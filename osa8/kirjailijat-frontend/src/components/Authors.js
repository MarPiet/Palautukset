import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState(0)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {refetchQueries: [ { query: ALL_AUTHORS } ]})

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit ={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          {props.authors.map(author =>
            <option key={author.name} value={author.name}>{author.name}</option>
            )}
        </select>
        <div>
          born
          <input
            value={setBornTo ||''}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
