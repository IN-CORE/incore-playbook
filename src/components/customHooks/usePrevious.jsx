import React, { useEffect, useRef } from "react";

// taken from https://usehooks.com/usePrevious/
export function usePrevious(value) {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
