import { useGetUserByIdQuery } from '@redux/api';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { decrement, increment } from '@redux/reducers/counter.reducer';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetUserByIdQuery(1);
  const [nextDataAPI, setNextDataAPI] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/hello');
        setNextDataAPI(response.data);
      } catch (err) {}
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Next.js!</h1>
      <h1 className="text-blue-600">Using TailwindCSS</h1>

      <h1 data-testid="counter">{counter.value.toString()}</h1>

      {isLoading && <div>RTK Loading...</div>}
      {error && <div>RTK Error!</div>}
      <h1>Using RTK data : {data && data.name}</h1>

      <h1 className="text-blue-600">
        Next.js API data : {nextDataAPI && nextDataAPI.name}
      </h1>

      <button data-testid="btn-increment" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button data-testid="btn-decrement" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};

export default Home;
