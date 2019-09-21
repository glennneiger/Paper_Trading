import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>('sign-in');

    const getPageHandler: () => JSX.Element = () => {
        switch(page) {
            case 'sign-in':
                return <SignIn setPage={setPage}/>;
            case 'sign-up':
                return <SignUp setPage={setPage}/>;
            case 'forgot-password':
                return <ForgotPassword setPage={setPage}/>;
            default:
                return <SignIn setPage={setPage}/>;
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
