import React from 'react'

const RecommendedBooks = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre  <span style={{fontWeight:'bold', fontSize:'20px'}}>{props.books.allBooks[0].genres[0]}</span>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks