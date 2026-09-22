const APP_ROUTES = {
  LANDING: "/",
  PROGRESS: "/progress",
  REGISTER: "/register",
  HOME: "/home",
};

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
