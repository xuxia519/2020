
// import { createAction } from 'redux-actions'
import { reqLogin } from '@apis/login'
// import { createAjaxAction } from '@configs/common'

export const login = (userName, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ userName, password })
      .then((response) => {
        // const { data } = response;
        // if (data.status === 0) {
          // const token = data.token;
          // dispatch(setUserToken(token));
          // setToken(token);
          resolve(response);
        // } else {
        //   const msg = data.message;
        //   reject(msg);
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// login 登陆
// export const requestLogin = createAction('request login')
// export const recevieLogin = createAction('receive login')
// export const login = createAjaxAction(common.login, requestLogin, recevieLogin)

// gFormCache gfor2.0m的缓存
// export const setGformCache2 = createAction('set gform cache2')
// export const clearGformCache2 = createAction('clear gform cache2')

// socket receive
// export const socketReceive = createAction('socketReceive')
