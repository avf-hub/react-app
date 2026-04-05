import { useEffect, useState } from 'react';

export function useLocalStorage(key) {
	const [data, setData] = useState();

	useEffect(() => {
		const storageData = localStorage.getItem(key);
		if (storageData) {
			setData(JSON.parse(storageData));
		}
	}, []);

	const saveData = (newData) => {
		if (newData.length) {
			localStorage.setItem(key, JSON.stringify(newData));
			setData(newData);
		}
	};

	return [data, saveData];
}