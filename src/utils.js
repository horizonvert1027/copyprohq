// Inside your utils file

export const getUserDataFromLocalStorage = () => {
    const userDataJSON = localStorage.getItem('user');
    if (userDataJSON) {
        try {
            const userData = JSON.parse(userDataJSON);
            return userData;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    return null;
};
