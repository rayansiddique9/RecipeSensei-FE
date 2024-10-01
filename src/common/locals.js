import { GLOBALS } from "./constants";

export const local = {
  storeRefreshToken: (refreshToken) => {
    localStorage.setItem(GLOBALS.REFRESH_TOKEN, refreshToken);
  },
  removeRefreshToken: () => {
    localStorage.removeItem(GLOBALS.REFRESH_TOKEN);
  },
  getRefreshToken: () => {
    return localStorage.getItem(GLOBALS.REFRESH_TOKEN);
  },
  storeIsNutritionist: (isNutritionist) => {
    localStorage.setItem(GLOBALS.IS_NUTRITIONIST, isNutritionist);
  },
  getIsNutritionist: () => {
    return localStorage.getItem(GLOBALS.IS_NUTRITIONIST);
  },
  clearLocalStorage: () => {
    localStorage.clear();
  },
};

