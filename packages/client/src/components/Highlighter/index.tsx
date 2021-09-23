import React from 'react';
import { escapeRegExp } from 'lodash';
import DOMPurify from 'dompurify';

interface HighlighterProps {
    text: string;
    searchString?: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({
    text,
    searchString = '',
}) => {
    if (!searchString || searchString.length < 2) {
        return <>{text}</>;
    }

    const regexp = new RegExp(escapeRegExp(searchString), 'gi');

    const highlightedText = text.replace(
        regexp,
        `<span style='background-color: yellow; font-weight: 500;'>$&</span>`
    );

    return (
        <span
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(highlightedText),
            }}
        />
    );
};

export default Highlighter;
