import Http from '../../utils/Http'
import * as authActions from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function fetchUser() {
  return dispatch => {
    return Http.get('auth/user')
      .then(res => {
        dispatch(authActions.authUser(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post('auth/login', credentials)
        .then(res => {
          dispatch(authActions.authLogin(res.data.access_token))
          return resolve()
        })
        .catch((err) => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode,
          };

          if (statusCode === 422) {
            const resetErrors = {
              errors: err.response.data.errors,
              replace: false,
              searchStr: '',
              replaceStr: '',
            };
            data.error = Transformer.resetValidationFields(resetErrors);
          } else if (statusCode === 401) {
            data.error = err.response.data.message;
          }
          return reject(data);
        })
    })
  )
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    return Http.delete('auth/logout')
      .then(() => {
        dispatch(authActions.authLogout())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
