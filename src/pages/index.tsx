import { NextPage } from 'next';
import { useRedirectOnMount } from '../hooks/useRedirectOnMount';

const Home: NextPage = () => {
  useRedirectOnMount('/explore');
  return <></>;
};

export default Home;
