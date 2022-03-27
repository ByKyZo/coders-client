import { useCallback, useMemo, useState } from 'react';
import MentionEntry from '@components/elements/editor/MentionEntry';
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from '@draft-js-plugins/mention';
import Link from '@components/elements/link/Link';

const mentions: MentionData[] = [
  {
    name: 'admin0',
    link: '/admin0',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    username: 'admin0',
    displayname: 'Momo',
    profilePicture:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'user3',
    link: '/admin0',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    username: 'user3',
    displayname: 'Mama',
    profilePicture:
      'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
];

interface IUseMentionsSuggestions {
  readOnly: boolean;
}

export const useMentionsSuggestions = ({
  readOnly,
}: IUseMentionsSuggestions) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions: UserMentionsSuggestions, plugins } =
    useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        mentionTrigger: '@',
        mentionPrefix: '@',
        mentionComponent: (mentionProps, test) => {
          console.log('From mention component : ', test);
          if (readOnly) {
            return (
              <Link
                className="text-primary hover:text-primary-dark hover:underline"
                href={`/${mentionProps.mention.name}`}
              >
                <span {...mentionProps}>{mentionProps.children}</span>
              </Link>
            );
          } else {
            return (
              <span
                {...mentionProps}
                className="text-primary hover:text-primary-dark"
                // onClick={() => onOpenChange(true)}
              >
                {mentionProps.children}
              </span>
            );
          }
        },
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
        // @ts-ignore
        entryComponent={MentionEntry}
        onAddMention={(mention) => {
          console.log('On mention add : ', mention);
        }}
      />
    ),
    plugins,
  };
};
