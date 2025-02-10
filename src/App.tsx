import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from './app/api/api-slice';

import AuthPage from './pages/auth-page';
import ProfilePage from './pages/profile-page';

import { RootState } from './app/store';

const App = () => {
  const {token, isAuth} = useSelector((state: RootState) => state.user);

  const {refetch} = useGetUserQuery(token, {skip: typeof token !== 'string'});

  useEffect(() => {
    if (token) {
      refetch();
    };
  }, [token, refetch]);

  return (
    <main className={`pt-[10rem]`}>
      {isAuth ? <ProfilePage/> : <AuthPage/>}
    </main>
  );
};

export default App;