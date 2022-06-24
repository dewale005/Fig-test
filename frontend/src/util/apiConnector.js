import axios from 'axios';
import * as t from '../store/types';

class Connect {
  authenticate({ path, payload }) {
    return async (_dispatch) => {
      axios
        .post(`${path}`, payload)
        .then((resp) => {
          localStorage.setItem('auth', resp.data.tokens.access.token);
          window.location.replace("/")
          return { success: true };
        })
        .catch((err) => {
          console.log(err.response.data);
          return { success: false };
        });
    };
  }

  get({ path, action }) {
    return async (_dispatch) => {
      _dispatch({ type: t.HANDLE_FETCHING });
      axios
        .get(`${path}`)
        .then((resp) => {
          if (action) {
            _dispatch({ type: action, payload: resp.data });
          }
          _dispatch({ type: t.HANDLE_SUCCESS });
          return { success: true };
        })
        .catch((err) => {
          _dispatch({ type: t.HANDLE_ERROR, payload: 'an error occurred' });
          return { success: false };
        });
    };
  }

  post({ path, payload, action }) {
    return async (_dispatch) => {
      const data = axios.post(`${path}`, payload);
      try {
        data.then((resp) => {
          if (action) {
            _dispatch({ type: action, payload: resp.data });
          }
          _dispatch({ type: t.HANDLE_SUCCESS });
        });
        return { success: true };
      } catch (error) {
        _dispatch({ type: t.HANDLE_ERROR, payload: 'an error occurred' });
        return { success: false };
      }
    };
  }
}

export default Connect;
