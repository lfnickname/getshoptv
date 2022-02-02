import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './banner/Banner';
import { ExitContext, AgreeContext } from '../../context';
import Promo from '../promo/Promo';
import Video from './video/Video';


function App() {
  const [needBanner, setNeedBanner] = useState<boolean>(false)
  const [agreeStatus, setAgreeStatus] = useState<boolean | null>(null)
  const [exitStatus, setExitStatus] = useState<boolean>(false)
  const [playStatus, setPlayStatus] = useState<boolean>(false)
  setTimeout(()=>{if (playStatus===false && agreeStatus===null) {setPlayStatus(true)}}, 0)
  setTimeout(()=>{if (agreeStatus===null && needBanner===false)setNeedBanner(true)}, 2000)
  if (agreeStatus===true && needBanner===true) {setNeedBanner(false); setPlayStatus(false)}
  if (agreeStatus===false && playStatus===false) {setPlayStatus(true)}
  console.log(agreeStatus)

  return (
    // <ExitContext.Provider value={{exitStatus, setExitStatus}}>
      <AgreeContext.Provider value={{agreeStatus, setAgreeStatus}}>
        <div className="App">
          <Video status={playStatus}/>
        {/* <iframe className='video' width="1280" height="720" src="https://www.youtube.com/embed/M7FIvfx5J10" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
          {needBanner && !exitStatus ? <Banner/> : <span/>}
          {agreeStatus && !exitStatus ? <Promo/> : <span/>}
        </div>
      </AgreeContext.Provider>

  );
}

export default App;
