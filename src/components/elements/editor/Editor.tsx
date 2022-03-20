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
export const removeScripTag = (html: string) => {
  return html.replaceAll(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
};

interface EditorProps {
  className?: string;
  // value?: (arg: { plain: string; html: string }) => void;
  value?: { plain: string; html: string };
  onChange?: (arg: { plain: string; html: string }) => void;
  searchValues: {
    value?: string | RegExp;
    valueCallback?: (content: string) => string;
    className?: string;
  }[];
  readonly?: boolean;
}

const Editor = ({
  searchValues,
  value,
  onChange,
  readonly,
  className,
}: EditorProps) => {
  // const [content, setContent] = useState({
  //   plain: '',
  //   html: '',
  // });
  const [content, setContent] = useState({
    plain: value?.plain || '',
    html: value?.html || '',
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const parser = (value: string) => {
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

  const setOutputValue = (value: string) => {
    if (!outputRef.current) return;
    outputRef.current.innerHTML = parser(removeScripTag(value));
    // outputRef.current.innerHTML = parser(value);
  };

  useEffect(() => {
    onChange && onChange(content);
    setOutputValue(content.html || content.plain);
  }, [content]);

  const handleInput = (e: any) => {
    setOutputValue(e.target.innerHTML);
    if (!outputRef.current) return;
    setContent({
      plain: outputRef.current.innerText,
      html: outputRef.current.innerHTML,
    });
  };

  return (
    <div className="relative min-h-24">
      <div
        spellCheck={false}
        onInput={handleInput}
        ref={editorRef}
        className={`cursor-text ${className}`}
        contentEditable={!readonly}
      />
      <div
        ref={outputRef}
        className={`absolute z-0 top-0 left-0 select-none pointer-events-none ${className}`}
      />
    </div>
  );
};

export default Editor;
