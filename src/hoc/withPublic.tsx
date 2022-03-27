import { getAccessToken } from '@helpers/index';
import { NextComponent } from '@typescript/index';

export const withPublic = (Element: NextComponent): NextComponent => {
  return (props: any) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      return <Element auth={true} {...props} />;
    }

    return <Element auth={false} {...props} />;
  };
};
