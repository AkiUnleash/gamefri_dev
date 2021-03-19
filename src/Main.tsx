// React
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Top from './components/pages/Top';
import Login from './components/pages/Login';
import Singup from './components/pages/Singup';
import Signupfinish from './components/pages/Signupfinish';
import Profile from './components/pages/Profile';
import DiaryWrite from './components/pages/Diarywrite';
// state
import { Provider } from "react-redux"
import { login, logout, selectUser } from './common/state/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { store } from './common/state/store'
// firebase
import { auth } from "./common/firebase/firebase"
// assets
import "assets/css/destyle.css"

const Main = (): JSX.Element => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        uid: authUser?.uid,
                        photoUrl: authUser?.photoURL,
                        displayName: authUser?.displayName
                    })
                )
            } else {
                dispatch(logout())
            }
        });
        // クリーンナップ関数
        return () => unSub()
    }, [dispatch])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Top} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Singup} />
                <Route path="/signupfinished" component={Signupfinish} />
                <Route path="/profile" component={Profile} />
                <Route path="/diarywrite" component={DiaryWrite} />
            </Switch>
        </BrowserRouter>
    );
};

render(
    <Provider store={store}>
        <Main />
    </Provider >
    , document.getElementById('root'));

export default Main;
