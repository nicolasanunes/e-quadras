export function formatDate(dateString: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const date = new Date(dateString)

  return date.toLocaleString('pt-BR', options).replace(',', '')
}

export function formatShortDate(dateString: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const date = new Date(dateString)

  return date.toLocaleDateString('pt-BR', options)
}
