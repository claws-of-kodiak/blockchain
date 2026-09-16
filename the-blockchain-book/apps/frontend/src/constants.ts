const APP_ROUTES = {
  LANDING: "/",
};

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
