const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailValidation = (email: string) => {
    return emailRegEx.test(email);
};