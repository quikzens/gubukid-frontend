import { API } from '../config/api'

export const fetchData = async (url, setData, setLoading, invokeAlert) => {
  try {
    const response = await API.get(url, { withCredentials: true })
    setData(response.data.data)
  } catch (err) {
    invokeAlert('error', `Error Fetch Data From API`)
  }

  setTimeout(() => setLoading(false), 300)
}
