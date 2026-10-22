export const APP_ROUTES = {
  LANDING: "/",
  LOG_IN: "/login",
  COURSE: "/course",
  REGISTER: "/register",
  HOME: "/home",
  ADMIN: "/admin",
};

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
