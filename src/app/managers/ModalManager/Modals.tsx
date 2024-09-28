import { useAppSelector } from "@/shared/lib/hooks";
import { modals } from "./ModalManagerSchema";

export const ModalManager = () => {
	const { currentModal } = useAppSelector((state) => state.modalManager);

	if (currentModal) {
		return modals[currentModal];
	}
	return null;
};
