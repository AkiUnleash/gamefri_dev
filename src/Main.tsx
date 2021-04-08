// React
import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from "./history";
// Components
import Top from './components/pages/Top';
import Login from './components/pages/Login';
import Singup from './components/pages/SearchAccount';
import Signupfinish from './components/pages/Signupfinish';
import Profile from './components/pages/Profile';
import DiaryWrite from './components/pages/Diarywrite';
import Home from './components/pages/Home';
import ProfileView from './components/pages/ProfileView';
import Diaryview from './components/pages/DiaryView';
import SearchAccount from './components/pages/SearchAccount';
import SearchDiary from './components/pages/SearchDiary';
// state
import { login, logout } from './common/state/userSlice'
import { useDispatch } from 'react-redux'
// firebase
import { auth, db } from "./common/firebase/firebase"
// assets
import "./assets/css/destyle.css"

const Main: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                db.collection("user")
                    .doc(authUser.uid)
                    .onSnapshot((snapshot) => {
                        const profileID = snapshot.data()?.profileid
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
                                    profileID: profileID,
                                    follower: follower,
                                })
                                )
                            })
                    })
            } else {
                dispatch(logout())
            }
        });
        // クリーンナップ関数
        return () => unSub()
    }, [dispatch])

    return (
        <Router history={browserHistory}>
            <Switch>
                <Route exact path="/" component={Top} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Singup} />
                <Route exact path="/signupfinished" component={Signupfinish} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/diarywrite" component={DiaryWrite} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/user/:profileid" component={ProfileView} />
                <Route exact path="/:profileid/status/:postid" component={Diaryview} />
                <Route exact path="/search/account" component={SearchAccount} />
                <Route exact path="/search/diary" component={SearchDiary} />
            </Switch>
        </Router>
    );
};

export default Main;