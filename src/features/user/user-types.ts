export interface User {
    name: string;
    email: string | undefined;
    id: string | undefined;
    token: string | undefined;
    isAuth: boolean;
    error: string | null;
};