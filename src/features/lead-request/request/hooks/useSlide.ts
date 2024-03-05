import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';
import { ONE_SECOND } from 'shared/consts/const';
import { SlideClasses } from '../consts';
import { useTimeout } from 'shared/hooks/useTimeout';

type useSlideReturn = {
	slideClass: SlideClasses
	setSlideClass: Dispatch<SlideClasses>
}

export const useSlide = (acceptanceTime: number): useSlideReturn => {

	const [ slideClass, setSlideClass ] = useState<SlideClasses>(SlideClasses.UnSlide);

	useEffect(() => {
		setSlideClass(SlideClasses.Slide);
	}, []);

	return { slideClass, setSlideClass };
};
