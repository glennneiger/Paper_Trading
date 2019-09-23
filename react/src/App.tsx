import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Dashboard/Dashboard';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>('dashboard');
    const [id, setId] = React.useState<number>(0);
    const [token, setToken] = React.useState<string>('');
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');

    const getPageHandler: () => JSX.Element = () => {
        switch(page) {
            case 'sign-in':
                return (
                    <SignIn 
                        setPage={setPage} 
                        setId={setId} 
                        setToken={setToken}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                    />
                ); 
            case 'sign-up':
                return (
                    <SignUp 
                        setPage={setPage} 
                        setId={setId} 
                        setToken={setToken}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                    />
                ); 
            case 'forgot-password':
                return <ForgotPassword setPage={setPage}/>;
            case 'dashboard':
                return (
                    <Dashboard 
                        setPage={setPage}
                        id={id}
                        token={token}
                        firstName={firstName}
                        lastName={lastName}
                    /> 
                );
            default:
                return (
                    <SignIn 
                        setPage={setPage} 
                        setId={setId} 
                        setToken={setToken}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
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
