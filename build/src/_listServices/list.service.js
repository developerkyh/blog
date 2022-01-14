import config from 'config';
import {authHeader} from '../_helpers';

const FormData = require('form-data');

export const listService = {
  listRegister,
  getAll,
  update,
  _delete
};

function listRegister() {
  const formData = new FormData($('#upload-file')[0]);
  const requestOptions = {
    method: 'POST',
    body: formData,
    //  body: JSON.stringify(list)
  };
  return fetch(`${config.apiUrl}/lists/register`, requestOptions).then(handleResponse);
}


function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    //headers: authHeader()
  };
  return fetch(`${config.apiUrl}/lists/list`, requestOptions).then(handleResponse);
}

function update(id) {
  const formData = new FormData($('#modify-file')[0]);
  const requestOptions = {
    method: 'POST',
    body: formData
  };
  return fetch(`${config.apiUrl}/lists/update/${id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(`${config.apiUrl}/lists/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        //location.reload(true);
        console.log("401 error! (권한 없음): 이 요청은 인증이 필요하다. 서버는 로그인이 필요한 페이지에 대해 이 요청을 제공할 수 있다. 상태 코드 이름이 권한 없음(Unauthorized)으로 되어 있지만 실제 뜻은 인증 안됨(Unauthenticated)에 더 가깝다.");
      }
      if (response.status === 400) {
        console.log("400 error!");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
