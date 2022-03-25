export {};

// import React, { useEffect, useRef, useState } from 'react';
// import Editor from '@components/elements/editor/Editor';
// import { HASHTAG_REGEX, MENTIONS_REGEX } from '@helpers/index';

// interface PostEditorProps {
//   value?: (arg: { plain: string; html: string; raw: string }) => void;
// }

// const PostEditor = ({ value }: PostEditorProps) => {
//   const [content, setContent] = useState({
//     plain: 'toto',
//     html: '<script>alert("toto")</script>',
//   });

//   // TODO Essayer d'extraire seulement le username du hastag (pour ensuite l'injecter dans un lien)
//   // TODO Avant d'envoyer au back simuler des hastags et injecter des <Link> pour voir si ça fonctionne
//   // https://www.npmjs.com/package/react-string-replace
//   useEffect(() => {
//     value && value(content);
//     console.log('From post editor : ', content);
//   }, [content]);

//   return (
//     <Editor
//       className="py-4 h-full w-full outline-none"
//       // value={setContent}
//       value={content}
//       onChange={setContent}
//     />
//   );
// };

// export default PostEditor;
