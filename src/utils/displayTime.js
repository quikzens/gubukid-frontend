const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export function displayDate(dateString, withDay = false) {
  const time = new Date(dateString)

  const day = days[time.getDay()]
  const date = time.getDate()
  const month = months[time.getMonth()]
  const year = time.getFullYear()

  if (withDay) {
    return `${day}, ${date} ${month} ${year}`
  }
  return `${date} ${month} ${year}`
}
