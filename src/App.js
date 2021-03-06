import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import React , { useEffect, useState } from 'react';

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [lineId, setLineId] = useState('');

  const logout = () => {
    liff.logout();
    window.location.href="http://localhost:3000/profile";
  }

  const initLine = () => {
    liff.init({ liffId: '1657241582-AEmxzpJE' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setLineId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div style={{ textAlign: "center" }}>
        <h1>Profile LINE </h1>
        <hr/>
        <img src={pictureUrl} width="300px" height="300px" alt=""/>
        {/* <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p> */}
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
        <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {lineId}</p>

        <button onClick={() => logout()} style={{ width: "100%", height: 60 }}>Logout</button>
      </div>
      </header>
    </div>
  );
}

export default App;