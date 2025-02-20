import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import { useEffect } from 'react';

export default function useHighlight() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            hljs.highlightAll();
        }
    }, []);

    return;
}