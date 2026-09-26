import React from "react";

export type Route = {
  path: string;
  label: string;
  element: React.ReactNode;
  inHeader: boolean;
};
