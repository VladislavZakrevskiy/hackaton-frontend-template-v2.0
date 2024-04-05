import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router'
import { PageLoader } from '@/widgets/PageLoader'
import { useSelector } from 'react-redux'
import { getUserInited } from '@/entities/User'
import { initAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import GlobalStyles from './styles/globalStyles'

const App = () => {
    const dispatch = useAppDispatch()
    const _inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    if (!_inited) {
        return <PageLoader />
    }

    return (
        <div>
            <GlobalStyles />
            <Suspense fallback={<PageLoader />}>
                {/* <Navbar /> */}
                <div className="content-page">
                    {/* <Sidebar /> */}
                    {_inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
