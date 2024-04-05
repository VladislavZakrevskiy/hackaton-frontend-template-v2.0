import { NotFoundPage } from '@/pages/NotFoundPage'
import { LazyMainPage } from '@/pages/MainPage'
import { AppRoutes, getRouteMain, getRouteNotFound } from '@/shared/consts/router'
import { AppRouteProps } from '@/shared/types/router'

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <LazyMainPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
}
