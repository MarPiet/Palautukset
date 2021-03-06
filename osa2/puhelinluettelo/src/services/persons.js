import axios from 'axios'
const baseUrl = '/api/persons'             //'http://localhost:3001/persons **osa2' 


const getAll =  () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteNumber = id =>{
     return axios.delete(`${baseUrl}/${id}`)
}

const replaceNumber = newObject =>{
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}

export default { 
    getAll,
    create,
    deleteNumber,
    replaceNumber
  }