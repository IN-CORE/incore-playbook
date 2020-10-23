import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//NOTE: This is only checking if a cookie is present, but not validating the cookie.
export const isAuthorized = () => {
	const authorization = cookies.get("Authorization");
	return process.env.DEPLOY_ENV === "local" ||
			(authorization !== undefined && authorization !== "" && authorization !==
					null);
};

// Figure out how to access history from a common util without hooks
// export const clearCookieAndLogout = () => {
// 	const history = useHistory();
// 	cookies.remove("Authorization");
// 	history.push("/login");
// };

