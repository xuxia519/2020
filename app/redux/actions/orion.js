import { fetchUser } from '@apis/orion';

export const fetchUsers = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchUser().then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
