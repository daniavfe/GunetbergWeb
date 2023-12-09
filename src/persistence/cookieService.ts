import Cookies from "universal-cookie";

const cookies = new Cookies();
const tokenKey: string = "authToken";

const getToken = () => {
	return cookies.get(tokenKey);
};

const setToken = (token: string) => {
	cookies.set(tokenKey, token);
};

const removeToken = () => {
	cookies.remove(tokenKey);
};

export const useCookies = {
	getToken,
	setToken,
	removeToken
};
