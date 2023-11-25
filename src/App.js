import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { rootLoader } from './pages/Root';
import Home, { homeLoader } from './pages/Home';
import { lazy, Suspense } from 'react';
import { detailPostLoader } from './pages/DetailPost';
const Auth = lazy(() => import('./pages/Auth'))
const DetailPost = lazy(() => import('./pages/DetailPost'))
const routers = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    id: 'root',
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: 'detail/:postId', element: <Suspense fallback={<p>...loading</p>}>
          <DetailPost />
        </Suspense>, loader: detailPostLoader
      },
    ],
    loader: rootLoader,
  },
  {
    path: '/auth', element: <Suspense fallback={<p>...loading</p>}>
      <Auth />
    </Suspense>
  },
])
function App() {
  return (
    <RouterProvider router={routers} />
  );
}

export default App;
