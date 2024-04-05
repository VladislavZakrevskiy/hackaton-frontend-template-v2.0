import { PayloadAction } from '@reduxjs/toolkit'
import { UISchema } from '../types/UISchema'
import { Themes } from '@/app/styles/themes/types/Themes'
import { lightTheme } from '@/app/styles/themes/light'
import { darkTheme } from '@/app/styles/themes/dark'
import { buildSlice } from '@/shared/lib/store/buildSlice'

const initialState: UISchema = {
    scroll: {},
    themeStyles: lightTheme,
}

const UISlice = buildSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{
                path: string
                position: number
            }>
        ) => {
            state.scroll[action.payload.path] = action.payload.position
        },

        toggleTheme: (state) => {
            const nextTheme = Themes.light == state.themeStyles.type ? darkTheme : lightTheme
            state.themeStyles = nextTheme
        },
    },
})

export const { actions: UIActions, reducer: UIReducer, useActions: useUIActions } = UISlice
