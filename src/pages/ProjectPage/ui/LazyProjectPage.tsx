import { lazy } from "react";

export const LazyProjectPage = lazy(async () => await import("./ProjectPage"));
