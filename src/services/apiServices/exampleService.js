import axios from 'axios'

export const connectToApi = () =>
    axios
        .get('http://localhost:4000/api')
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return null
        })
