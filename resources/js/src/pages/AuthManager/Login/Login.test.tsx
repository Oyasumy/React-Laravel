import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Login from './index';
import { Provider } from 'react-redux';
import { store } from '@reducer/configStore';
import { BrowserRouter, Routes } from 'react-router-dom';
import App from '@navigation/index';
import MainSource from '../../../../index';
import { PAGE_URL } from '@constants';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { usePokemon } from './hook';

const mockedUsePokemonQuery = usePokemon;
// jest.mock('./hook',{

//   return ()=> ({ data: { name: 'ditto', order: 214 }, isLoading: false, error: {} })
// });

// jest.mock('./hook', () => ({
//   __esModule: true,
//   usePokemon: jest.fn().mockImplementation(() => ({ data: { name: 'ditto', order: 214 }, isLoading: false, error: {} })),
// }));

// jest.mock('./hook');

{
  /* <rootDir> is: /Users/xuancuong/DEV/sonix/anicam/annicam/resources/js/src */
}

// const ReactQueryConfigProvider = ({ children, defaultOptions }) => {
//   const client = useQueryClient();
//   const [newClient] = React.useState(
//     () =>
//       new QueryClient({
//         queryCache: client.getQueryCache(),
//         muationCache: client.getMutationCache(),
//         defaultOptions,
//       }),
//   );

//   return <QueryClientProvider client={newClient}>{children}</QueryClientProvider>;
// };

// const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });
//   return ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// };

const renderWithRouter = (children: any, { route = '/' } = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console for tests
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
  });

  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter },
    ),
  };
};

test('demo', () => {
  expect(true).toBe(true);
});

// test('Renders the main page', async () => {
//   // const user = userEvent.setup();
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });

//   const user = userEvent.setup();

//   // await act(async () => {
//   //   await render(
//   //     <Provider store={store}>
//   //       <App />
//   //     </Provider>,
//   //     { wrapper: BrowserRouter },
//   //   );
//   // });

//   await act(async () => {
//     await renderWithRouter(
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </QueryClientProvider>,
//       { route: PAGE_URL.AUTH.LOGIN },
//     );

//     // const { result, waitFor } = renderHook(() => useCustomHook(), {
//     //   wrapper: createWrapper()
//     // })
//     /* finish loading suspended data */
//     // expect(true).toBe(true);
//   });
//   // console.log(screen);
//   expect(screen.getByText(/ログイン/i)).toBeInTheDocument();

//   // verify page content for default route
//   // expect(screen.getByText(/you are home/i)).toBeInTheDocument();

//   // verify page content for expected route after navigating
//   // await user.click(screen.getByText(/about/i));
//   // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
// });

test('Renders the main page', async () => {
  // const user = userEvent.setup();
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       retry: false,
  //     },
  //   },
  // });

  // const user = userEvent.setup();

  // await act(async () => {
  //   await renderWithRouter(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </QueryClientProvider>,
  //     { route: PAGE_URL.AUTH.LOGIN },
  //   );
  await act(async () => {
    jest.mock('./hook', () => ({
      // __esModule: true,
      usePokemon: jest.fn(() => ({ poke:  { name: 'ditto', order: 214 }, refetch: () => {} })),
    }));

   
    await act(async () => {
    });

    await renderWithRouter(<App />, { route: PAGE_URL.AUTH.LOGIN });

    // mockedUsePokemonQuery.mockImplementation(() => ({
    //   status: 'success',
    //   data: [
    //     { id: 1, name: 'test user' },
    //     { id: 2, name: 'test user2' },
    //   ],
    // }));
    // const { result, waitFor } = renderHook(() => useCustomHook(), {
    //   wrapper: createWrapper()
    // })
    /* finish loading suspended data */
    // expect(true).toBe(true);
  });
  // screen.debug();
  // console.log(screen);
  expect(screen.getByText(/ditto/i)).toBeInTheDocument();

  // verify page content for default route
  // expect(screen.getByText(/you are home/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  // await user.click(screen.getByText(/about/i));
  // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});
