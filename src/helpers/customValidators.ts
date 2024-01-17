export const validateBirthDate = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
  return age >= 18
}
