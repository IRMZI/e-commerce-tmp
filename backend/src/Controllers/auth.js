import { ok, serverError } from "../helpers/httpResponse.js";
import { debug, info, error } from "../helpers/logger.js"; // Import logger

export const login = async (loginData) => {
  try {
    debug(`login called with data: ${JSON.stringify(loginData)}`);
    // ...existing code...
    info(`User logged in: ${loginData.email}`);
    return ok({ token });
  } catch (err) {
    error(`Error logging in: ${err.message}`);
    return serverError(err);
  }
};

export const register = async (registerData) => {
  try {
    debug(`register called with data: ${JSON.stringify(registerData)}`);
    // ...existing code...
    info(`User registered: ${registerData.email}`);
    return ok({ user });
  } catch (err) {
    error(`Error registering user: ${err.message}`);
    return serverError(err);
  }
};
