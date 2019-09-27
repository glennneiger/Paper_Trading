import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Dashboard from './Dashboard/Dashboard';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>('dashboard');
    const [id, setId] = React.useState<number>(0);
    const [token, setToken] = React.useState<string>('eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEsInVsbiI6IkJhcnJvbiIsInVmbiI6Ikpvc2VmZiIsInVlbSI6ImFkbWluQGFkbWluLmNvbSIsImV4cCI6MTU2OTY5MjE5OCwiaWF0IjoxNTY5NjA0MzU4OTcyfQ.dszRyxl9H30TLEvQU3nSNpi5nbVXkZ7wC416hu2xwTLk7Ey9AiGYCNKA62V1_nLxO3Mbiq3PAG_3gmE3Mlsaiw');
    const [firstName, setFirstName] = React.useState<string>('Humphrey');
    const [lastName, setLastName] = React.useState<string>('Appleby');

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
