import { buildSlice } from "@/shared/lib/store/buildSlice";
import { ModalManagerSchema, Modals } from "./ModalManagerSchema";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalManagerSchema = {
	currentModal: null,
	modals: {
		CREATE_PROJECT: { isOpen: false },
	},
};

const modalManager = buildSlice({
	name: "modalManager",
	initialState,
	reducers: {
		setIsOpen: (store, action: PayloadAction<{ modal: Modals; isOpen: boolean }>) => {
			store.modals[store.currentModal || Modals.CREATE_PROJECT].isOpen = action.payload.isOpen;
			if (action.payload.isOpen) {
				store.currentModal = action.payload.modal;
			} else {
				store.currentModal = null;
			}
		},
	},
});

export const { reducer: ModalManagerReducer, useActions: useModalManagerActions } = modalManager;
