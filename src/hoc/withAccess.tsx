import { getAccessToken, isBrowser } from '@helpers/index';
import { UserRoles } from '@typescript/index';
import { useRouter } from 'next/router';
import { useMeQuery } from '../graphql/queries/get-me/index.generated';
import { hasAccess } from '../helpers/index';

interface WithAccessProps {
  accessType: 'auth' | 'noAuth' | 'public';
  role?: UserRoles;
}

// TODO: Remplacer tout les HOC d'accés (withAuth/withNoAuth/withPublic) par celui-ci
const withAccess = <T,>(WrappedComponent: any, options: WithAccessProps): T => {
  // @ts-ignore
  return (props: any): any => {
    // Verifie si on est sur le client ou le serveur
    if (isBrowser) {
      const Router = useRouter();
      const { data } = useMeQuery();
      const accessToken = getAccessToken();

      // Si un role est specifié on verifie si l'utilisateur a le role ou plus
      if (
        options.role &&
        data?.me &&
        !hasAccess(data?.me.roles!, options.role)
      ) {
        Router.push('/auth/login');
        return null;
      }

      switch (options.accessType) {
        case 'auth':
          // Si il n'y a pas de token le user est redirigé vers la page de connexion
          if (!accessToken) {
            Router.push('/auth/login');
            return null;
          }
          break;
        case 'noAuth':
          // Si il a un de token le user est redirigé vers la page explore
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
