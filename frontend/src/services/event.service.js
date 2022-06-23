import Connect from "../util/apiConnector"
import * as t from "../store/types";

const connector = new Connect()

export const getEvents = () => connector.get({path: "/v1/event", action: t.FETCH_EVENT_DATA })
export const addEvents = (payload) => connector.post({path: "/v1/event", payload: payload})
