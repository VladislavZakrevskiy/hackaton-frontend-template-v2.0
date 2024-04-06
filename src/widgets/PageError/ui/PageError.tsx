import { FC } from 'react'
import { useTranslation } from 'react-i18next'
// Надо перед этим написать кнопку
// import { Button } from '@/shared/ui/Button';
import { SPageError } from './PageError.style'

interface Props {}

export const PageError: FC<Props> = () => {
    const { t } = useTranslation()

    const reloadPage = () => {
        location.reload()
    }

    return (
        <SPageError>
            {t('Произошла непредвиденная ошибка')}
            {/* <Button onClick={reloadPage}>{t('Обновить страницу')}</Button> */}
        </SPageError>
    )
}
