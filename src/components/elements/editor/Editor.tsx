import React, { useEffect, useRef, useState } from 'react';

export const removeHTMLTags = (html: string) => {
  return html.replaceAll(/(<([^>]+)>)/gi, '');
};

export const removeHtmlClass = (html: string) => {
  return html.replaceAll(/class="[a-zA-Z0-9:;.\s()\-,]*"/gi, '');
};

export const removeHtmlStyle = (html: string) => {
  return html.replaceAll(/(<[^>]+) style=".*?"/gi, '');
};

export const removeHtmlAttributes = (html: string) => {
  return html.replaceAll(/<\s*(\w+).*?>/gi, '');
};

interface EditorProps {
  value?: (arg: { plain: string; html: string }) => void;
  searchValues: {
    value?: string | RegExp;
    valueCallback?: (content: string) => string;
    className?: string;
  }[];
  readonly?: boolean;
}

const test: string | RegExp = /toto/gm;

const Editor = ({ searchValues, value, readonly }: EditorProps) => {
  const [content, setContent] = useState({
    plain: '',
    html: '',
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const parseValue = (value: string) => {
    searchValues.forEach(({ value: searchValue, className, valueCallback }) => {
      value = valueCallback
        ? valueCallback(value)
        : value.replaceAll(
            searchValue || '',
            `<span class="${className}">$&</span>`
          );
    });
    return value;
  };

  useEffect(() => {
    value && value(content);
  }, [content]);

  const handleSetDescription = (e: any) => {
    if (!outputRef.current) return;
    outputRef.current.innerHTML = removeHtmlStyle(
      parseValue(e.target.innerHTML)
    );
    setContent({
      plain: outputRef.current.innerText,
      html: outputRef.current.innerHTML,
    });
  };

  return (
    <div className="relative min-h-24">
      <div
        spellCheck={false}
        onInput={handleSetDescription}
        ref={editorRef}
        className="py-4 h-full w-full outline-none cursor-text"
        contentEditable={!readonly}
      />
      <div
        ref={outputRef}
        className="py-4 absolute z-0 top-0 left-0 h-full w-full outline-none select-none pointer-events-none"
      />
    </div>
  );
};

export default Editor;
