import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CastDetail from "./component/CastDetail/CastDetail";
import Colection from "./component/Colection/Colection";
import DetailMovie from "./component/DetailMovie/DetailMovie";
import FAQpage from "./component/FAQpage/FAQpage";
import Footer from "./component/Footer/Footer";
import Homepage from "./component/Homepage/Homepage";
import MoviePage from "./component/MoviePage/MoviePage";
import MoviePage2 from "./component/MoviePage/MoviePage2";
import NavBar from "./component/NavBar/NavBar";
import SearchPage from "./component/SearchPage/SearchPage";
import TVPage from "./component/TVPage/TVPage";
import WatchPage from "./component/WatchPage/WatchPage";
import Loginpage from "./component/LoginPage/Loginpage";
import Signup from "./component/Signup/Signup";
import Admin from "./component/admin/Admin";
import useDarkMode from 'react-use-dark-mode';

import {
  collection,
  addDoc,
  doc,
  getDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "./config/firebase";
import WatchPage2 from "./component/WatchPage/WatchPage2";

function App() {
  const [MovieID, setMovieID] = useState();
  const [MovieType, setMovieType] = useState("");
  const [light, setLight] = useState(false);
  const [actor, setActor] = useState({
    actorId: "",
    name: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const [colection, setColection] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const getId = (newId, newType) => {
    setMovieID(newId);
    setMovieType(newType);
  };
  const getCastId = (myActorId, myActorName) => {
    const newActor = { ...actor, actorId: myActorId, name: myActorName };
    setActor(newActor);
  };
  const getColection = (colectionFilm) => {
    const newColection = [...colection];
    newColection.unshift(colectionFilm);
    setColection(newColection);
  };
  const userProfile = async (profile) => {
    setUserInfo(profile);
    const q = query(
      collection(db, "users"),
      where("email", "==", profile.email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.docs.length) {
      await addDoc(collection(db, "users"), {
        email: profile.email,
        name: profile.name,
        googleId: profile.googleId,
        imageUrl: profile.imageUrl,
        timeRegister: new Date(),
      });
    } else {
      if(querySnapshot.docs[0].data().block) {
        alert("Tài khoản của bạn đã bị khóa")
        return
      } else {
        console.log("No")
      }
    }
  };

  return (
    
    <Router>
      <div className="App">
        <NavBar light={light} setLight={setLight} userInfo={userInfo} isLogin={isLogin} />
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/search">
            <SearchPage getId={getId} />
          </Route>
          <Route path="/type/movie">
            <MoviePage getId={getId} />
          </Route>
          <Route path="/new-version">
            <MoviePage2 getId={getId} />
          </Route>
          <Route path="/type/tv">
            <TVPage getId={getId} />
          </Route>
          <Route exact path={`/FAQ`}>
            <FAQpage />
          </Route>
          <Route exact path={`/colection`}>
            <Colection type={MovieType} colection={colection} getId={getId} />
          </Route>
          <Route exact path={`/login`}>
            <Loginpage userProfile={userProfile} />
          </Route>
          <Route exact path={`/signup`}>
            <Signup userProfile={userProfile} />
          </Route>
          <Route exact path={`/${MovieType}/${MovieID}`}>
            <DetailMovie
              id={MovieID}
              type={MovieType}
              getCastId={getCastId}
              getColection={getColection}
            />
          </Route>
          <Route exact path={`/cast/${actor.name}`}>
            <CastDetail actor={actor} getId={getId} />
          </Route>
          <Route exact path={`/watch/${MovieType}/${MovieID}`}>
            <WatchPage type={MovieType} id={MovieID} light={light} setLight={setLight} />
          </Route>
          <Route exact path={`/watchmovie/:id`}>
            <WatchPage2 light={light} setLight={setLight} />
          </Route>
          <Route path="/">
            <Homepage getId={getId} />
          </Route>
         
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
