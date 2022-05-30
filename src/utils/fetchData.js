import { API } from '../config/api'

export const fetchData = async (url, setData, setLoading, invokeAlert) => {
  setLoading(true)

  try {
    const response = await API.get(url, { withCredentials: true })
    setData(response.data.data)
    setTimeout(() => setLoading(false), 300)
  } catch (err) {
    invokeAlert('error', `Error Fetch Data From API`)
  }
}
