import axios from 'axios'

const apiConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `${process.env.REACT_APP_API_URL}/api`,
}

export const API = axios.create(apiConfig)

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
