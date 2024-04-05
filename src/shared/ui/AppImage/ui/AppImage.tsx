import { cn } from '@/shared/lib/classNames'
import { FC, ImgHTMLAttributes, ReactNode, useLayoutEffect, useState } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactNode
    errorFallback?: ReactNode
}

export const AppImage: FC<Props> = ({ className, src, alt = 'image', fallback, errorFallback, ...otherProps }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = () => {
            setIsLoading(false)
        }
        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && errorFallback) {
        return errorFallback
    }

    return <img src={src} alt={alt} className={cn('', {}, [className])} {...otherProps} />
}
