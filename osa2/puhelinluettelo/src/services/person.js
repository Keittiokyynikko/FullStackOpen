import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const addNew = newObject => {
    return axios.post(baseURL, newObject)
}

const removePerson = id => {
    return axios.delete(`${baseURL}/${id}`)
}

const editPerson = (changedNumber, id) => {
    return axios.put(`${baseURL}/${id}`, changedNumber)
}

export default {getAll, addNew, removePerson, editPerson}