import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './banner/Banner';
import { ExitContext, AgreeContext } from '../../context';
import Promo from '../promo/Promo';

function App() {
  const [needBanner, setNeedBanner] = useState<boolean>(false)
  const [agreeStatus, setAgreeStatus] = useState<boolean>(false)
  const [exitStatus, setExitStatus] = useState<boolean>(false)
  setTimeout(()=>{if (agreeStatus===false && needBanner===false)setNeedBanner(true)}, 1000)
  if (agreeStatus===true && needBanner===true) setNeedBanner(false)
  console.log(agreeStatus)
  if (exitStatus) return <div>end</div>
  return (
    <ExitContext.Provider value={{exitStatus, setExitStatus}}>
      <AgreeContext.Provider value={{agreeStatus, setAgreeStatus}}>
        <div className="App">

          {needBanner ? <Banner/> : <span/>}
          {agreeStatus ? <Promo/> : <span/>}
        </div>
      </AgreeContext.Provider>
    </ExitContext.Provider>
  );
}

export default App;
