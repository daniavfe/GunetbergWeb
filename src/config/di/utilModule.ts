import Cookies from "universal-cookie";
import UserUtil from "../../views/utils/userUtil";
import CookieUtil from "../../views/utils/cookieUtil";

const cookieUtil: CookieUtil = new CookieUtil(new Cookies());
const userUtil: UserUtil = new UserUtil(cookieUtil);

export const useCookieUtil = () => cookieUtil;
export const useUserUtil = () => userUtil;
