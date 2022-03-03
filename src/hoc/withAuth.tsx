import { useRouter } from 'next/router';
import { getAccessToken } from '../helpers/index';
import { NextComponent } from '../types/index';

const withAuth = (WrappedComponent: NextComponent): NextComponent => {
  return (props: any) => {
    // Verifie si on est sur le client ou le serveur
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const accessToken = getAccessToken();

      // Si il n'y a pas de token le user est redirigé vers la page de connexion
      if (!accessToken) {
        Router.replace('/auth/login');
        return null;
      }

      // On return le composant apres le traitement
      return <WrappedComponent {...props} />;
    }

    // Si on est sur le serveur on return null
    return null;
  };
};

export default withAuth;
