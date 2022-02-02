import React, { useEffect, useRef, useState } from 'react';
import styles from './promo.module.css'
import QrCode from '../../img/qr.png'
import {useAgreeContext } from '../../context';
import { ReactComponent as Galka } from '../../svg/galka.svg';
import { ReactComponent as Exit } from '../../svg/exit.svg';

const Promo: React.FC = () => {
    const [focused, setFocused] = useState<string | undefined>('') // focused element
    const {agreeStatus, setAgreeStatus} = useAgreeContext()
    const [showGalka, setShowGalka] = useState<boolean>(false) //custom checkbox
    const [number, setNumber] = useState<string>('') //phone number
    const [isValid, setValid] = useState<boolean>(true)
    const [sendStatus, setSendStatus] = useState<boolean>(false)

    // autofocus при первом рендере
    const myRef = useRef<HTMLButtonElement>(null)
    useEffect(()=>{myRef.current?.focus()}, [])


    let showenNumber: string = ''

    const spaceEvnt = new KeyboardEvent('keydown', {'keyCode': 32, 'which': 32});
    // DEV ONLY
    //  представление того, как нужно менять фокус при нажатии arrow buttons
    // const abstractTabIndexMatrix = [
    //     [11, 12, 13, 99],
    //     [21, 22, 23, 99],
    //     [31, 32, 33, 99],
    //     [41, 41, 42, 99],
    //     [51, 51, 51, 99],
    //     [61, 61, 61, 99]
    // ]
    // element id = element tabindex
      

    function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (focused)
        {
        switch(e.key){
            case 'Enter':
                document.dispatchEvent(spaceEvnt);
                return
            case 'Backspace':
                backspaceClickHandler()
                return
            case 'ArrowUp':
                if (focused==='42') document.getElementById('33')?.focus()
                else if (focused==='51') {
                    document.getElementById('41')?.focus()
                }
                else if (focused==='61') {
                    document.getElementById('51')?.focus()
                }
                else if (+focused[0]<5) {
                    const newFocus = (+focused[0]-1)
                    document.getElementById(newFocus.toString()+focused[1])?.focus()
                }
                else {document.getElementById('11')?.focus()}
                return
            case 'ArrowDown':
                if (focused==='33') document.getElementById('42')?.focus()
                else if (+focused[0]<4 ?? +focused[0]>1) {
                    const newFocus = (+focused[0]+1)
                    document.getElementById(newFocus.toString()+focused[1])?.focus()
                }
                else if (focused[0]==='4') {
                    document.getElementById('51')?.focus()
                }
                else if (focused[0]==='5') {
                    document.getElementById('61')?.focus()
                }
                else {document.getElementById('11')?.focus()}
                return
            case 'ArrowLeft':
                if (focused==='99') {
                    document.getElementById('13')?.focus()
                }
                else if (focused==='42') {
                    document.getElementById('41')?.focus()
                }
                else if (+focused[0]<4 &&  +focused[1]>1){
                    const newFocus = (+focused[1]-1)
                    document.getElementById(focused[0] + newFocus.toString())?.focus()
                }
                else {document.getElementById('11')?.focus()}
                return
            case 'ArrowRight':
                if (focused==='41') {
                    document.getElementById('42')?.focus()
                }
                else if (focused==='13' || focused==='23' || focused==='33' || focused==='42' || focused==='51' || focused==='61') {
                    document.getElementById('99')?.focus()
                }
                else if (+focused[1]<3 && +focused[0]<4){
                    const newFocus = (+focused[1]+1)
                    document.getElementById(focused[0] + newFocus.toString())?.focus()
                }
                else {document.getElementById('11')?.focus()}
                return
            default:
                if (!isNaN(+e.key)) panelClickHandler(e.key)
                return
        }
    }
    }
    for (let i = 0; i<10; i++){
        showenNumber = showenNumber + (number[i] ? number[i] : '_')
    }
    function panelClickHandler (value: string){
        if (number.length<10) {
            setNumber(number + value)
            setValid(true)}
    }
    function backspaceClickHandler (){
        setValid(true)
        if (number.length>0) setNumber(number.slice(0, number.length-1))
    }
    async function sendHandler () {
        const phone = '7'+number
        const result = await validatePhone(+phone)
        if (result.valid === true) {
            setValid(true)
            {document.getElementById('99')?.focus()}
            setSendStatus(true)
        }
        else {
            {
            setValid(false)
            document.getElementById('11')?.focus()}
        }
    }

    async function validatePhone (phone: number) {
          const response = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=fb7a381371ae4975b88f1dea6aa37b2c&phone=${phone}`)
          const data = await response.json()
          return data
        }
    return (
        <div onFocus={()=>{setFocused(document.activeElement?.getAttributeNode('tabIndex')?.value)}} onKeyDown={keyDownHandler} className={styles.promo}>
            <div className={styles.main}>
            {sendStatus ?
            <div className={styles.send}>
                <div className={styles.sendtitle}>ЗАЯВКА <br/> ПРИНЯТА</div>
                <div className={styles.sendsubtitle}>Держите телефон под рукой. <br/>Скоро с Вами свяжется наш менеджер. </div>
            </div>
            :
            <div className={styles.content} >
                <div className={styles.upper_text}>Введите ваш номер<br/>мобильного телефона</div>
                <div className={isValid ? styles.number : (`${styles.number} ${styles.red}`)}>+7({showenNumber.slice(0,3)}){showenNumber.slice(3,6)}-{showenNumber.slice(6,8)}-{showenNumber.slice(8,10)}</div>
                <div className={styles.lower_text}>и с Вами свяжется наш менеждер для <br/>дальнейшей консультации</div>
                <div className={styles.panel}>
                    <button tabIndex={11} id='11' ref={myRef} onClick={()=>{panelClickHandler('1')}} className={styles.panel_button}>1</button>
                    <button tabIndex={12} id='12' onClick={()=>{panelClickHandler('2')}} className={styles.panel_button}>2</button>
                    <button tabIndex={13} id='13' onClick={()=>{panelClickHandler('3')}} className={styles.panel_button}>3</button>
                    <button tabIndex={21} id='21' onClick={()=>{panelClickHandler('4')}} className={styles.panel_button}>4</button>
                    <button tabIndex={22} id='22' onClick={()=>{panelClickHandler('5')}} className={styles.panel_button}>5</button>
                    <button tabIndex={23} id='23' onClick={()=>{panelClickHandler('6')}} className={styles.panel_button}>6</button>
                    <button tabIndex={31} id='31' onClick={()=>{panelClickHandler('7')}} className={styles.panel_button}>7</button>
                    <button tabIndex={32} id='32' onClick={()=>{panelClickHandler('8')}} className={styles.panel_button}>8</button>
                    <button tabIndex={33} id='33' onClick={()=>{panelClickHandler('9')}} className={styles.panel_button}>9</button>
                    <button tabIndex={41} id='41' onClick={()=>{backspaceClickHandler()}} className={styles.panel_button_big}>Стереть</button>
                    <button tabIndex={42} id='42' onClick={()=>{panelClickHandler('0')}} className={styles.panel_button}>0</button>
                </div>
                {isValid ? 
                <div className={styles.agree}>
                <button tabIndex={51}  id='51' onClick={()=>{setShowGalka(!showGalka)}} className={styles.agree_but}><div className={styles.galkawrapper}>{showGalka ? <Galka width={34} height={32}/> : <span/>}</div></button>
                <div className={styles.agree_text}>Согласие на обработку<br/>персональных данных</div></div>
                :
                <div className={styles.notvalid}>НЕВЕРНО ВВЕДЕН НОМЕР</div>}
                {showGalka===false || isValid===false ? <button disabled tabIndex={61} id='61' className={styles.suc}>Подтвердить номер</button>
                :
                <button tabIndex={61} id='61' onClick={()=>sendHandler()} className={styles.suc_enabled}>Подтвердить номер</button>}
            </div>}
            <button tabIndex={99}  id='99' onClick={()=>{setAgreeStatus(false)}} className={styles.exit}>
                <Exit width={32} height={32} className={styles.exitsvg}/>
            </button>
            <div className={styles.qrwrapper}>
                <div className={styles.qrwrapper_text}>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</div>
                <img src={QrCode} width={110}/>
            </div>
            </div>
        </div>
    );
}

export default Promo;