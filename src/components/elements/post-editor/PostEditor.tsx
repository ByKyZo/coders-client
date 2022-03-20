import React, { useEffect, useRef, useState } from 'react';
import Editor from '@components/elements/editor/Editor';

const PostEditor = () => {
  const [content, setContent] = useState({
    plain: '',
    html: '',
  });

  // TODO Essayer d'extraire seulement le username du hastag (pour ensuite l'injecter dans un lien)
  // TODO Avant d'envoyer au back simuler des hastags et injecter des <Link> pour voir si ça fonctionne
  // https://www.npmjs.com/package/react-string-replace
  useEffect(() => {
    console.log('from PostEditor', content);
    console.log('from PostEditor', content.plain.search(/\B#(\w+)/gm));
  }, [content]);

  //     //   /(^|W)(#[a-zd][w-]*)/gm,
  //   <div className="u underline "></div>;
  return (
    <Editor
      value={setContent}
      searchValues={[
        {
          value: /\B#(\w+)/gm,
          className: 'text-primary',
        },
        {
          value: /\B@(\w+)/gm,
          className: 'text-primary',
        },
      ]}
    />
  );
};

export default PostEditor;
