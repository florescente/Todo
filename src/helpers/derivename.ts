function derivename(email: string) {
  const username = email.split('@')
  return username[0]
}

export default derivename
