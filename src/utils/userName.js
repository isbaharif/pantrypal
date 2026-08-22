const KEY = 'whatscookin_name'

export function getUserName() {
  return localStorage.getItem(KEY) || ''
}

export function setUserName(name) {
  localStorage.setItem(KEY, name.trim())
}

export function hasUserName() {
  return !!getUserName()
}