import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Logout() {

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "applications/json"

            },
            credentials: "include"
        }).then((res) => {
            navigate('/login', { replace: true });
            dispatch({ type: "USER", payload: false })
            if (res.status !== 200) {
                const error = new Error("Didn't get the response")
                throw error;
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [navigate, dispatch])
    return (
        <></>
    )
}

export default Logout