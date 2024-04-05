import { cn } from '@/shared/lib/classNames'
import { FC } from 'react'
import classes from './Loader.module.scss'

interface Props {
    className?: string
}

// Loader чисто для шаблона - надо менять под дизайн
export const Loader: FC<Props> = ({ className }) => {
    return (
        <div className={cn(classes['lds-spinner'], {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
