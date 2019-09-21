import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const App: React.FC = () => {

    const [page, setPage] = React.useState<string>("sign-in");

    const getPageHandler: () => JSX.Element = () => {
        switch(page) {
            case "landing":
                return <LandingPage setPage={setPage} />;
            case "sign-in":
                return <SignIn />;
            case "sign-up":
                return <SignUp />;
            default:
                return <LandingPage setPage={setPage} />; 
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
