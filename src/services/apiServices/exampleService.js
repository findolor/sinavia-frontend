import axios from 'axios'

export const connectToApi = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/')
        return response.data
    } catch (err) {
        return err
    }
}
