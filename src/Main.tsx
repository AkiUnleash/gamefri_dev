import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from "./history";
import Top from './components/pages/Top';
import Login from './components/pages/Login';
import Singup from './components/pages/Singup';
import TermsOfService from './components/pages/TermsOfService';
import TermsOfPolicies from './components/pages/TermsOfPolicies';
import Price from './components/pages/Price';
import Question from './components/pages/Question'
import Inquiry from './components/pages/Inquiry'
import Signupfinish from './components/pages/Signupfinish';
import Profile from './components/pages/Profile';
import DiaryWrite from './components/pages/Diarywrite';
import Home from './components/pages/Home';
import ProfileView from './components/pages/ProfileView';
import Diaryview from './components/pages/DiaryView';
import SearchAccount from './components/pages/SearchAccount';
import SearchDiary from './components/pages/SearchDiary';
import Notification from './components/pages/Notification';
import NotFound from './components/pages/404'
import { login, logout } from './common/state/userSlice'
import { useDispatch } from 'react-redux'
import { auth, db } from "./common/firebase/firebase"
import ScrollToTop from "./ScrollToTop"
import "./assets/css/destyle.css"

const Main: React.FC = () => {
    const dispatch = useDispatch();

    // Reduxのdispachを実行した際に副作用として実行
    // Firebase側でログインが確認できれば、状態管理にデータを取得
    // ログインしていなければ、状態管理のデータを初期化
    // (フォロワーデータも取得するため、ネストしている。)
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                db.collection("user")
                    .doc(authUser.uid)
                    .onSnapshot((snapshot) => {
                        const profileID = snapshot.data()?.profileid
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
        // ルート管理
        <Router history={browserHistory}>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/" component={Top} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Singup} />
                    <Route exact path="/service" component={TermsOfService} />
                    <Route exact path="/price" component={Price} />
                    <Route exact path="/question" component={Question} />
                    <Route exact path="/policies" component={TermsOfPolicies} />
                    <Route exact path="/inquiry" component={Inquiry} />
                    <Route exact path="/signupfinished" component={Signupfinish} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/diarywrite" component={DiaryWrite} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/user/:profileid" component={ProfileView} />
                    <Route exact path="/:profileid/status/:postid" component={Diaryview} />
                    <Route exact path="/search/account" component={SearchAccount} />
                    <Route exact path="/search/diary" component={SearchDiary} />
                    <Route exact path="/notification" component={Notification} />
                    <Route component={NotFound} />
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default Main;