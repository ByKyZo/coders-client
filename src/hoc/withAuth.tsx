import { getAccessToken, isBrowser } from '@helpers/index';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: any): any => {
  return (props: any) => {
    // Verifie si on est sur le client ou le serveur
    if (isBrowser) {
      const Router = useRouter();

      const accessToken = getAccessToken();

      if (!accessToken) {
        Router.push('/auth/login');
        return null;
      }

      // Si il n'y a pas de token le user est redirigé vers la page de connexion

      // On return le composant apres le traitement
      return <WrappedComponent {...props} />;
    }

    // Si on est sur le serveur on return null
    return null;
  };
};

export default withAuth;
