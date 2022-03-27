import { useMemo } from 'react';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { BsEmojiSmile } from 'react-icons/bs';
import Button from '@components/elements/button/Button';

export const useEmojisPlugin = () => {
  const { EmojiSuggestions, EmojiSelect, plugins } = useMemo(() => {
    const emojiPlugin = createEmojiPlugin({
      useNativeArt: true,
      selectButtonContent: (
        <Button
          icon={<BsEmojiSmile />}
          onClick={() => {
            console.log('Click on emojiButton');
          }}
          onlyIcon
          rounded
          styleType="primaryOutline"
          sizeType="medium"
        />
      ),
    });
    const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
    const plugins = [emojiPlugin];

    return { plugins, EmojiSuggestions, EmojiSelect };
  }, []);

  return {
    EmojiSuggestions,
    EmojiSelect,
    plugins,
  };
};
