import { useCallback, useMemo, useState } from 'react';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from '@draft-js-plugins/mention';

const mentions: MentionData[] = [
  {
    name: 'React',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Nodejs',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
];

export const useHashtagsSuggestions = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions: UserMentionsSuggestions, plugins } =
    useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        mentionTrigger: '#',
        mentionPrefix: '#',
      });

      const { MentionSuggestions } = mentionPlugin;

      const plugins = [mentionPlugin];

      return { plugins, MentionSuggestions };
    }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  return {
    component: (
      <UserMentionsSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />
    ),
    plugins,
  };
};
