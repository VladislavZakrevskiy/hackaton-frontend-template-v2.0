import { cn } from '@/shared/lib/classNames'
import { FC } from 'react'
import classes from './PageLoader.module.scss'
import { Loader } from '@/shared/ui/Loader'

interface Props {
    className?: string
}

export const PageLoader: FC<Props> = ({ className }) => {
    return (
        <div
            className={cn(classes.PageLoader, {}, [
                className,
            ])}
        >
            <Loader/>
        </div>
    )
}
