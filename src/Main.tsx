// React
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Top from './components/pages/Top';
import Login from './components/pages/Login';
import Singup from './components/pages/Singup';
import Signupfinish from './components/pages/Signupfinish';
import Profile from './components/pages/Profile';
import DiaryWrite from './components/pages/Diarywrite';
import Home from './components/pages/Home';
        
// state
import { login, logout } from './common/state/userSlice'
import { useDispatch } from 'react-redux'
// firebase
import { auth, db } from "./common/firebase/firebase"
// assets
import "assets/css/destyle.css"

const Main: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // followerの取得
                db.collection("user")
                    .doc(authUser.uid)
                    .collection("followings")
                    .onSnapshot((snapshot) => {
                        const follower = snapshot.docs.map(f => f.id)
                        // 状態管理
                        dispatch(login({
                            uid: authUser?.uid,
                            photoUrl: authUser?.photoURL,
                            displayName: authUser?.displayName,
                            follower: follower,
                        })
                        )
                    })
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
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Main;