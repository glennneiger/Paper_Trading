import React from 'react';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    id: number; 
    token: string; 
    firstName: string; 
    lastName: string; 
}

const Dashboard: React.FC<Props> = props => {
    return (
        <div>
            <p>You Have Signed In</p>
            <p>ID: {props.id}</p>
            <p>TOKEN: {props.token}</p>
            <p>FIRST NAME: {props.firstName}</p>
            <p>LAST NAME: {props.lastName}</p>
        </div>
    );
} 

export default Dashboard; 