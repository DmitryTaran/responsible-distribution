import { useEffect, useRef } from 'react';

export const useAudio = (isDisabled: boolean, audioUrl: string): void => {

	const { current: audio } = useRef(new Audio());

	useEffect(() => {
		if (!isDisabled) {
			audio.src = audioUrl;
			audio.play()
		}
	}, []);

};