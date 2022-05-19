import axios from 'axios'

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
})

export const configForm = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const configJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}
