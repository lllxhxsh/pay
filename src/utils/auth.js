import Cookies from 'js-cookie'

const TokenKey = 'loginToken_pay'
const IdKey = 'IdKey_pay'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getId() {
  return Cookies.get(IdKey)
}

export function setId(Id) {
  return Cookies.set(IdKey, Id)
}

