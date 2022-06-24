import Connect from "../util/apiConnector"
// import * as t from "../store/types";

const connector = new Connect()

export const registerUser = (payload) => connector.authenticate({path: "/v1/auth/register", payload: payload })
export const loginUser = (payload) => connector.authenticate({path: "/v1/auth/login", payload: payload})
