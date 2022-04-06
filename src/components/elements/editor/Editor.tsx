import React, { useCallback, useEffect, useState } from 'react';
import {
  EditorState as DraftEditorState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DraftEditor from '@draft-js-plugins/editor';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import { useMentionsSuggestions } from '@components/elements/editor/useMentionsSuggestions';
import { useHashtagsSuggestions } from '@components/elements/editor/useHashtagsSuggestions';
import ReactDOM from 'react-dom';
import { useMount } from '@hooks/useMount';
import { useEmojisPlugin } from '@components/elements/editor/useEmojisPlugin';

interface EditorProps {
  wrapperClassname?: string;
  emojiButtonTriggerPortalDestinationElement?: HTMLElement;
  className?: string;
  initRaw?: RawDraftContentState;
  setRaw?: RawDraftContentState;
  editorStateValue?: (arg: DraftEditorState) => void;
  onChange?: (arg: {
    plain: string;
    html: string;
    raw: RawDraftContentState;
  }) => void;
  readOnly?: boolean;
  placeholder?: string;
}

const parseJson = (value: any) => JSON.parse(JSON.stringify(value || {}));

const Editor = ({
  onChange,
  initRaw,
  readOnly,
  setRaw,
  wrapperClassname,
  placeholder,
  editorStateValue,
  emojiButtonTriggerPortalDestinationElement,
}: EditorProps) => {
  const getValidContentState = useCallback(() => {
    try {
      return DraftEditorState.createWithContent(
        convertFromRaw(parseJson(initRaw))
      );
    } catch {
      return DraftEditorState.createWithContent(
        convertFromRaw({ blocks: [], entityMap: {} })
      );
    }
  }, [initRaw]);

  const [editorState, setEditorState] = useState(getValidContentState());
  const isMount = useMount();

  const { component: UserMentionsSuggestions, plugins: mentionsPlugin } =
    useMentionsSuggestions({ readOnly: Boolean(readOnly) });

  const { component: HashtagsSuggestions, plugins: hashtagsPlugin } =
    useHashtagsSuggestions();

  const {
    EmojiSuggestions,
    EmojiSelect,
    plugins: emojiPlugin,
  } = useEmojisPlugin();

  /**
   * NOTE : Reset le button emoji
   * (La librairie @draft-js-plugins/emoji est mal faites....)
   */
  useEffect(() => {
    if (readOnly) {
      return;
    }

    const emojiButtonWrapper = [
      // @ts-ignore
      ...document.querySelectorAll('.__DraftEmojiButton__'),
    ];

    let emojiButtons = [];

    if (emojiButtonWrapper) {
      emojiButtons = Array.from(
        emojiButtonWrapper.map((e) => e.querySelector('button'))
      );
    }

    emojiButtons.forEach((e) => {
      if (!e) return;
      e.style.background = 'transparent';
      e.style.border = 'none';
      e.style.width = 'auto';
    });
  }, [isMount, readOnly, emojiButtonTriggerPortalDestinationElement]);

  useEffect(() => {
    // !readOnly &&
    onChange &&
      onChange({
        plain: editorState.getCurrentContent().getPlainText(),
        html: stateToHTML(editorState.getCurrentContent()),
        raw: convertToRaw(editorState.getCurrentContent()),
      });
  }, [editorState.getCurrentContent()]);

  // Reset le contenu en changeant de context
  useEffect(() => {
    if (!setRaw) return;
    setEditorState(
      DraftEditorState.createWithContent(
        convertFromRaw(parseJson(setRaw || { blocks: [], entityMap: {} }))
      )
    );
  }, [setRaw]);

  useEffect(() => {
    editorStateValue && editorStateValue(editorState);
  }, [editorStateValue]);

  return (
    <>
      <div className={`${wrapperClassname}`}>
        <DraftEditor
          placeholder={
            !readOnly
              ? placeholder
                ? placeholder
                : 'Write something...'
              : undefined
          }
          readOnly={readOnly}
          editorState={editorState}
          onChange={setEditorState}
          plugins={[...emojiPlugin, ...mentionsPlugin, ...hashtagsPlugin]}
        />
      </div>
      {UserMentionsSuggestions}
      {HashtagsSuggestions}
      <EmojiSuggestions />
      {/* 
        NOTE :Insere le button emoji dans la toolbar de l'editor 
        (La librairie @draft-js-plugins/emoji est mal faites....)
      */}
      {!readOnly &&
        emojiButtonTriggerPortalDestinationElement &&
        isMount &&
        ReactDOM.createPortal(
          <span className="__DraftEmojiButton__">
            <EmojiSelect />
          </span>,
          emojiButtonTriggerPortalDestinationElement
        )}
    </>
  );
};

export default Editor;
