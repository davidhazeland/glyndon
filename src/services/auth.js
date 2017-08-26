import Parse from './parse'

export const isAuthorized = () => {
  return Parse.User.current() !== null
}
