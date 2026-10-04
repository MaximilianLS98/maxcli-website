import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copy text to the clipboard and expose a short-lived "copied" flag for UI feedback.
 */
export const useCopyToClipboard = (resetAfterMs = 2000) => {
	const [copied, setCopied] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => () => clearTimeout(timeout.current), []);

	const copy = useCallback(
		async (text: string) => {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				clearTimeout(timeout.current);
				timeout.current = setTimeout(() => setCopied(false), resetAfterMs);
			} catch {
				setCopied(false);
			}
		},
		[resetAfterMs],
	);

	return { copied, copy };
};
