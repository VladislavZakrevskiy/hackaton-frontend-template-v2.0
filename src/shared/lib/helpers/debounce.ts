export function debounce<T>(func: (...args: T[]) => void, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: T[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
