import { useSelector,useDispatch } from 'react-redux';

import Button from '../components/button';

import { logout } from '../features/user/user-slice';

import { RootState } from '../app/store';

const ProfilePage = () => {
    const { name, email} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(logout());
    }; 

    return (
        <div className={`flex flex-col items-center justify-center gap-[0.5rem] w-xs m-auto px-[1rem] py-[0.5rem] bg-white rounded-lg`}>
            <h1>Добро пожаловать!</h1>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <Button text={'Выход'} clickHandler={onClickHandler}/>
        </div>
    );
};

export default ProfilePage;