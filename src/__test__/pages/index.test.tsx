// import { cleanup, render, screen } from '@helpers/test';
// import Home from '@pages/index';

// // Test avec redux : https://redux.js.org/usage/writing-tests#connected-components

// afterEach(cleanup);

// it('home page test', () => {
//   render(<Home />);

//   const text = screen.getByText('Welcome to Next.js!');

//   expect(text).toBeInTheDocument();
// });

// // describe('my counter store', () => {
// //   it('should be Increment', async () => {
// //     const { getByTestId } = render(<Home />, {
// //       preloadedState: {
// //         counter: {
// //           value: 0,
// //         },
// //       },
// //     });
// //     fireEvent.click(getByTestId('btn-increment'));
// //     expect(getByTestId('counter')).toHaveTextContent('1');
// //   });
// //   it('should be Decrement', async () => {
// //     const { getByTestId } = render(<Home />, {
// //       preloadedState: {
// //         counter: {
// //           value: 0,
// //         },
// //       },
// //     });
// //     fireEvent.click(getByTestId('btn-decrement'));
// //     expect(getByTestId('counter')).toHaveTextContent('-1');
// //   });
// // });
