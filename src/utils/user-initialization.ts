import { User } from '../features/user/user-types';

const token = sessionStorage.getItem('jwtAuth');

let initialToken: string | undefined = undefined;

if (token) {
    initialToken = token;
};

// Возвращает функцию для создания  начального состояния пользователя.
function createInitialUser(): User {
    return {
        name: '',
        email: '',
        id: '',
        token: initialToken,
        isAuth: false,
        error: null,
    };
};

export default createInitialUser;