import { useState } from "react";
import { useQuery, useMutation} from "@apollo/client";
import { ALL_AUTHORS,EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName ] = useState('')
  let [born, setBorn ] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR,{
    refetchQueries:[ {query: ALL_AUTHORS}]})
    
  if (result.loading)  {
    return <div>loading...</div>
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name:name, setBornTo:Number(born) }})
    setName('')
    setBorn('')
  }
  
  const authors = result?.data?.allAuthors ?? [];

  return (
    <div>
    <h2>authors</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((a) => (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h2>Set BirthYear</h2>
    <form onSubmit={onSubmitForm}>
      <div>
        name
        <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/>
      </div>
      <div>
        born
        <input type="number" value={born} onChange={(event)=>{setBorn(event.target.value)}}/>
      </div>
      <button type="submit">update authors</button>
    </form>
  </div>
  )
}

export default Authors
