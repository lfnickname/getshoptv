import React, { useContext, useEffect, useRef } from 'react';
import styles from './banner.module.css'
import QrCode from '../../../img/qr.png'
import { AgreeContext } from '../../../context';

const Banner: React.FC = () => {
    const myRef = useRef<any>(null)
    const {agreeStatus, setAgreeStatus} = useContext<any>(AgreeContext)
    useEffect(()=>{myRef.current.focus()}, [])
    return (
        <div className={styles.banner}>
            <div className={styles.flexcolumn}>
                <div className={styles.text}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! <br/>ПОДАРИТЕ ЕМУ СОБАКУ!</div>
                <div className={styles.qrwrapper}><img width={126} src={QrCode}/></div>
                <div className={styles.text_buttom}>Сканируйте QR-код <br/>или нажмите ОК</div>
                <div onClick={()=>{if (agreeStatus!=true) setAgreeStatus(true)}} ref={myRef} tabIndex={0} className={styles.input_wrapper}><span className={styles.ok}>OK</span></div>
            </div>
        </div>
    );
}

export default Banner;