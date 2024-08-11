import { useEffect, useRef, useState } from "react";

export function useIntesectionObserver() {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	const elementRef = useRef(null);
	const [counter, setCounter] = useState<number>(0);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]: IntersectionObserverEntry[]) => {
				if (entry.isIntersecting) {
					setCounter((counter) => counter + 0.5);
				}
				setIsIntersecting(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			},
		);
		if (elementRef.current) {
			observer.observe(elementRef.current);
		}
	}, []);

	return { isIntersecting, elementRef, counter };
}
