import { lazy } from "react";

export const LazyTaskPage = lazy(async () => await import("./TaskPage"));
