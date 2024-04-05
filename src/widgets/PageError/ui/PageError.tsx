import { cn } from '@/shared/lib/classNames'
import { FC } from 'react'
import classes from './PageError.module.scss'
import { useTranslation } from 'react-i18next'
// Надо перед этим написать кнопку
// import { Button } from '@/shared/ui/Button';
import { SPageError } from './PageError.style'

interface Props {
    className?: string
}

export const PageError: FC<Props> = ({ className }) => {
    const { t } = useTranslation()

    const reloadPage = () => {
        location.reload()
    }

    return (
        <SPageError className={cn(classes.PageError, {}, [className])}>
            {t('Произошла непредвиденная ошибка')}
            {/* <Button onClick={reloadPage}>{t('Обновить страницу')}</Button> */}
        </SPageError>
    )
}
