import axios from 'axios'

export const postUser = userInformation => {
    axios
        .post('http://localhost:4000/api/users', userInformation)
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}
