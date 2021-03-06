import React, { useEffect, useRef } from 'react';
import styles from './banner.module.css'
import QrCode from '../../../img/qr.png'
import {useAgreeContext } from '../../../context';

const Banner: React.FC = () => {
    const myRef = useRef<HTMLButtonElement>(null)
    const {agreeStatus, setAgreeStatus} = useAgreeContext()
    useEffect(()=>{myRef.current?.focus()}, []) //autofocus at first render
    const spaceEvnt = new KeyboardEvent('keydown', {'keyCode': 32, 'which': 32});
    function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            document.dispatchEvent(spaceEvnt);
            return
        }
    }
    return (
        <div onKeyDown={keyDownHandler} className={styles.banner}>
            <div className={styles.flexcolumn}>
                <div className={styles.text}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! <br/>ПОДАРИТЕ ЕМУ СОБАКУ!</div>
                <div className={styles.qrwrapper}><img width={126} src={QrCode}/></div>
                <div className={styles.text_buttom}>Сканируйте QR-код <br/>или нажмите ОК</div>
                <button onClick={()=>{if (agreeStatus!=true) setAgreeStatus(true)}} ref={myRef} tabIndex={0} className={styles.input_wrapper}><span className={styles.ok}>OK</span></button>
            </div>
        </div>
    );
}

export default Banner;