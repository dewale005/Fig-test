import axios from "axios";
import * as t from "../store/types";

class Connect {
    // constructor() {
    // }

    get({path, action}) {
        return async (_dispatch) => {
            _dispatch({ type: t.HANDLE_FETCHING });
            const data = axios.get(`${path}`)
            try {
                data.then((resp) => {
                    if (action) {
                      _dispatch({type: action, payload: resp.data});
                    }
                    _dispatch({ type: t.HANDLE_SUCCESS });
                  });
                  return { success: true };
            } catch (error) {
                _dispatch({ type: t.HANDLE_ERROR, payload: "an error occurred" });
                return { success: true };
            }
        }
    }

    post({path, payload, action}) {
        return async (_dispatch) => {
            const data = axios.post(`${path}`, payload)
            try {
                data.then((resp) => {
                    if (action) {
                      _dispatch({type: action, payload: resp.data});
                    }
                    _dispatch({ type: t.HANDLE_SUCCESS });
                  });
                  return { success: true };
            } catch (error) {
                _dispatch({ type: t.HANDLE_ERROR, payload: "an error occurred" });
                return { success: true };
            }
        }
    }
}

export default Connect;