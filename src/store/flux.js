


const getState = ({ getStore, getActions, setStore }) => {

    return {
        store: {
            isAuth: false,
            user: "",
        },

        actions: {
            login: (history, name ) => {
                setStore({
                    isAuth: true,
                    user: name, 
                })
                sessionStorage.setItem('isAuth', JSON.stringify(true));
                sessionStorage.setItem('user', (name));   //session y local storage solo recibe string, el json.stringify hace este cambio
                history.push('/dashboard')         
            },

            logout: history => {
                setStore({
                    isAuth: false,
                    user:""
                })
                history.push('/login')
            },

            isAuth: () => {
                if(sessionStorage.getItem('isAuth') && sessionStorage.getItem('user')){
                    setStore({
                        isAuth: JSON.parse(sessionStorage.getItem('isAuth')),
                        user: sessionStorage.getItem('user')   //el json.parse vuelve a convertir a JSON el string, se debe poner entre paréntesis TODA la estructura
                    })
                }else{
                    console.log("nop")
                }
            }
    }
}
}

export default getState;