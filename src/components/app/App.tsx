import React, { useEffect, useState } from 'react';
import './App.css';
import Banner from './banner/Banner';
import { AgreeContext } from '../../context';
import Promo from '../promo/Promo';
import Video from './video/Video';


function App() {
  const [needBanner, setNeedBanner] = useState<boolean>(false) //вывод баннера по таймауту
  const [agreeStatus, setAgreeStatus] = useState<boolean | null>(null) //согласие провалиться в promo page
  const [playStatus, setPlayStatus] = useState<boolean>(false) //пауза - воспроизведение видео
  setTimeout(()=>{if (playStatus===false && agreeStatus===null) {setPlayStatus(true)}}, 0) //фикс бага, из-за которого видео не паузилось
  setTimeout(()=>{if (agreeStatus===null && needBanner===false)setNeedBanner(true)}, 5000)
  if (agreeStatus===true && needBanner===true) {setNeedBanner(false); setPlayStatus(false)}
  if (agreeStatus===false && playStatus===false) {setPlayStatus(true)}

  return (
      <AgreeContext.Provider value={{agreeStatus, setAgreeStatus}}>
        <div className="App">
          <Video status={playStatus}/>
          {needBanner ? <Banner/> : <span/>}
          {agreeStatus ? <Promo/> : <span/>}
        </div>
      </AgreeContext.Provider>

  );
}

export default App;
