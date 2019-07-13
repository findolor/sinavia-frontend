import axios from 'axios'

export const getUser = userEmail => {
    axios
        .get('http://localhost:4000/api/users/' + userEmail)
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
            return null
        })
}
