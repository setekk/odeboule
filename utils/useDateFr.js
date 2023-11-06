
export function useDateFr(isoDate) {
  const newDate = new Date(isoDate)
  return newDate.toLocaleString('fr');
}