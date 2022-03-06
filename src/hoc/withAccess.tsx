import { getAccessToken, isBrowser } from '@helpers/index';
import { NextComponent } from '@typescript/index';
import { useRouter } from 'next/router';

interface WithAccessProps {
  accessType: 'auth' | 'noAuth' | 'public';
}

const withAccess = (
  WrappedComponent: NextComponent,
  options: WithAccessProps
  //   accessType: 'auth' | 'noAuth' | 'public'
): NextComponent => {
  return (props: any) => {
    // Verifie si on est sur le client ou le serveur
    if (isBrowser) {
      const Router = useRouter();

      const accessToken = getAccessToken();

      switch (options.accessType) {
        case 'auth':
          // Si il n'y a pas de token le user est redirigé vers la page de connexion
          if (!accessToken) {
            Router.push('/auth/login');
            return null;
          }
          break;
        case 'noAuth':
          // Si il n'y a pas de token le user est redirigé vers la page explore
          if (accessToken) {
            Router.push('/auth/explore');
            return null;
          }
          break;
        case 'public':
          // Renvoie le props auth selon le token
          if (accessToken) {
            // ? Le props 'auth' ne sert a rien pour l'instant
            return <WrappedComponent auth={true} {...props} />;
          } else {
            return <WrappedComponent auth={false} {...props} />;
          }
      }

      // On return le composant apres le traitement
      return <WrappedComponent {...props} />;
    }

    // Si on est sur le serveur on return null
    return null;
  };
};

export default withAccess;
