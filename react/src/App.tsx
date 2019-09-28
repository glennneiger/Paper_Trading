import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Dashboard/Dashboard';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>('sign-in');
    const [id, setId] = React.useState<number>(0);
    const [token, setToken] = React.useState<string>('');

    const signOut: (sessionExpired: boolean) => void = (sessionExpired) => {
        setToken('');
        setPage('sign-in'); 
    }

    const getPageHandler: () => JSX.Element = () => {
        switch(page) {
            case 'sign-in':
                return (
                    <SignIn 
                        setPage={setPage} 
                        setToken={setToken}
                    />
                ); 
            case 'sign-up':
                return (
                    <SignUp 
                        setPage={setPage} 
                        setToken={setToken}
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
                        setToken={setToken}
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
