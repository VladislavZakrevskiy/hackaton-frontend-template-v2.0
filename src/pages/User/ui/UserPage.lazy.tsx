import { lazy } from "react";

export const LazyUserPage = lazy(async () => await import("./UserPage"));
