import {useState} from 'react';
import { useToLoginMutation, useToRegisterMutation } from '../app/api/api-slice';

import Input from '../components/input';
import Button from '../components/button';

import { emailValidation } from '../utils/validation';

const AuthPage = () => {
    const [inputValues, setInputValues] = useState({email: '', password: '', confirmPassword: ''}); // контроль значений инпутов
    const [errors, setErrors] = useState({email: false, password: false, confirmPassword: false}); // управление состоянием ошибки интпутов
    const [isLogIn, setIsLogIn] = useState(true); // переключение между формой регистрации и входа

    const [login, {error: errorLogin}] = useToLoginMutation();
    const [register, {error: errorRegister}] = useToRegisterMutation();

    // Событие изменения состояния инпутов
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;

        if (key === 'email' && errors.email) {
            setErrors(prev => {
                return {...prev, email: false};
            });
        };

        if (key === 'password' && errors.password) {
            setErrors(prev => {
                return {...prev, password: false};
            });
        };

        // Если активна форма регистрации, то необходимо убирать состояние ошибки.
        if (!isLogIn) {
            if (key === 'password' || key === 'confirmPassword') {
                if (errors.password || errors.confirmPassword) {
                    if (inputValues.password === inputValues.confirmPassword) {
                        setErrors(prev => {
                            return {...prev, password: false, confirmPassword: false};
                        });
                    };
                };
            };
        };

        setInputValues(prev => {
            return {...prev, [key]: event.target.value};
        });
    };

    // Переключение между формами
    const onClickHandler = (toggle: boolean | undefined) => {
        if (toggle) {
            setInputValues({email: '', password: '', confirmPassword: ''});
            setErrors({email: false, password: false, confirmPassword: false});
            setIsLogIn(prev => !prev);
        };
    };

    // Отправка формы
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errorObj = {email: false, password: false, confirmPassword: false};
        let isError = false;

        if (!emailValidation(inputValues.email)) {
            errorObj.email = true;
            isError = true;
        };

        if (inputValues.password.length < 6) {
            errorObj.password = true;
            isError = true;
        };

        if (!isLogIn) {
            if (inputValues.password !== inputValues.confirmPassword) {
                errorObj.password = true;
                errorObj.confirmPassword = true;
                isError = true;
            };
        };

        if (isError) {
            setErrors(errorObj);
            return;
        };

        console.log(inputValues);

        try {
            if (isLogIn) {
                await login({email: inputValues.email, password: inputValues.password}).unwrap();
            } else {
                await register({email: inputValues.email, password: inputValues.password}).unwrap();
            };
        } catch(error) {
            console.error("Ошибка!", error);
        };
    };

    return (
        <form className='w-xs m-auto px-[1rem] py-[0.5rem] bg-white rounded-lg' onSubmit={onSubmitHandler}>
            <div className={`mb-[3rem] flex flex-col gap-[0.5rem]`}>
                <Button text={'Вход'} toggleHandler={onClickHandler} isInactive={!isLogIn}/>
                <Button text={'Регистрация'} toggleHandler={onClickHandler} isInactive={isLogIn}/>
            </div>
            <Input label={'Почта'} type={'email'} name={'email'} value={inputValues.email} changeHandler={onChangeHandler} isError={errors.email}/>
            <Input label={'Пароль'} type={'password'} name={'password'} value={inputValues.password} changeHandler={onChangeHandler} isError={errors.password}/>
            {!isLogIn && <p className={`text-xs mb-[1rem]`}>Минимум 6 символов</p>}
            {!isLogIn && <Input label={'Подтвердите пароль'} type={'password'} name={'confirmPassword'} value={inputValues.confirmPassword} changeHandler={onChangeHandler} isError={errors.confirmPassword}/>}
            <Button text={isLogIn ? 'Войти' : 'Создать аккаунт'} type='submit'/>
            {errorLogin ? <p className={`text-red-500`}>{`Ошибка логина.`}</p> : null}
            {errorRegister ? <p className={`text-red-500`}>{`Ошибка регистрации.`}</p> : null}
        </form>
    );
};

export default AuthPage;