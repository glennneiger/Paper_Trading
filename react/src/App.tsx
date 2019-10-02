import React from 'react';
import { useCookies } from 'react-cookie';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Dashboard/Dashboard';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>('sign-in');
    const [token, setToken] = React.useState<string>('');
    const [cookies, setCookie] = useCookies(['token']);

    console.log(cookies.token)


    React.useEffect(() => {
        console.log("COOKIE TOKEN" + cookies.token);
        if (cookies.token !== undefined || cookies.token !== null) {
            console.log("COOKIE TOKEN" + cookies.token)
            signIn(cookies.token);
        }
    }, []);

    const signOut: (sessionExpired: boolean) => void = (sessionExpired) => {
        setToken('');
        setCookie('token', null);
        setPage('sign-in'); 
    }

    const signIn: (token: string) => void = (token) => {
        setToken(token);
        setCookie('token', token, { maxAge: 43200 });
        setPage('dashboard'); 
    }

    const getPageHandler: () => JSX.Element = () => {
        switch(page) {
            case 'sign-in':
                return (
                    <SignIn 
                        setPage={setPage}     
                        signIn={signIn} 
                    />
                ); 
            case 'sign-up':
                return (
                    <SignUp 
                        setPage={setPage} 
                        signIn={signIn} 
                    />
                ); 
            case 'forgot-password':
                return <ForgotPassword setPage={setPage}/>;
            case 'dashboard':
                return (
                    <Dashboard 
                        token={token}
                        signOut={signOut}
                    /> 
                );
            default:
                return (
                    <SignIn 
                        setPage={setPage}     
                        signIn={signIn} 
                    />
                ); 
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
