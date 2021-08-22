import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Timer } from 'react-countdown-clock-timer';
import { Formik } from "formik";
import  {ReactComponent as Settings} from './images/settings.svg'
import  play from './images/play.png'
import  stop from './images/stop.png'
import  lock from './images/lock.png'
import  restartPng from './images/restartPng.png'

import './Index.css'

import Modal from 'react-modal';


class Tablo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password:'TABLO',
            totalTimeInSeconds:90,
            timeIfNeed:90,
            timeIfNeedBreak:15,
            isPaused:true,
            isPausedBreakTime:true,
            redSidePoints:0,
            blueSidePoints:0,
            maxViolations:10,
            redSideViolations:[],
            blueSideViolations:[],
            roundsNo:3,
            breakTimeInSecond:15,
            currentRound:0,
            isPasswordTrue:false,
            passwordModalIsOpen:false,
            writtenPassword:'',
            modalSettingsIsOpen:false,
            modalResultIsOpen:false,
            winner:'',
            isMatchGoing:false

        }
    }

    componentDidMount() {
        const this1 = this
        window.addEventListener("keydown",(e)=>{

            switch (e.keyCode){
                case 32:
                    if(this1.state.isMatchGoing===true){
                        this1.setState({
                            isPaused:!this1.state.isPaused
                        })
                    }
                    break
                case 68:

                    if(this1.state.isMatchGoing ){
                        this1.setState({
                            redSidePoints:this1.state.redSidePoints+1
                        })
                    }
                    break
                case 65:
                    if(this1.state.isMatchGoing ) {
                        if (this1.state.redSidePoints-1>=0){
                            this1.setState({
                                redSidePoints:this1.state.redSidePoints-1
                            })
                        }
                    }
                    break
                case 39:
                    if(this1.state.isMatchGoing) {
                        this1.setState({
                            blueSidePoints:this1.state.blueSidePoints+1
                        })
                    }
                    break
                case 37:
                    if(this1.state.isMatchGoing) {
                        if(this1.state.blueSidePoints-1>=0){
                            this1.setState({
                                blueSidePoints:this1.state.blueSidePoints-1
                            })
                        }
                    }
                    break
                case 83:
                    if(this1.state.isMatchGoing){

                        let newArr = this1.state.redSideViolations.slice(0,-1)

                        this1.setState({
                            redSideViolations:newArr
                        })
                    }
                    break
                case 40:
                    if(this1.state.isMatchGoing) {

                        let newArr = this1.state.blueSideViolations.slice(0,-1)

                        this1.setState({
                            blueSideViolations:newArr
                        })
                    }
                    break
                case 87:
                    if(this1.state.isMatchGoing) {
                        if(this1.state.redSideViolations.length<this1.state.maxViolations){
                            let newArr = this1.state.redSideViolations //[0,1,2,3,4,5,6,7]
                            newArr.push(this1.state.redSideViolations.length)


                            this1.setState({
                                redSideViolations:newArr
                            })
                        }
                    }
                    break
                case 38:
                    if(this1.state.isMatchGoing) {
                        if(this1.state.blueSideViolations.length<this1.state.maxViolations) {
                            let newArr = this1.state.blueSideViolations //[0,1,2,3,4,5]
                            newArr.push(this1.state.blueSideViolations.length)

                            this1.setState({
                                blueSideViolations:newArr
                            })
                        }
                    }
                    break
                default:
                    break;
            }
        })
    }


    render() {
        const {isMatchGoing,currentRound,redSidePoints ,writtenPassword ,maxViolations,timeIfNeedBreak,timeIfNeed , winner,modalResultIsOpen , roundsNo, redSideViolations , blueSideViolations ,modalSettingsIsOpen ,isPasswordTrue , blueSidePoints,totalTimeInSeconds,isPaused,isPausedBreakTime,passwordModalIsOpen,breakTimeInSecond} = this.state
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };

        const changeBackground = (e) =>{
            e.target.style.background = '#43bf64';
        }

        const getBackBackground = (e) =>{
            e.target.style.background = '#BBBBBB'
        }

        const openOrClosePasswordModal = (type) =>{
            this.setState({
                passwordModalIsOpen:type
            })
        }

        const checkPasswordIsTrue=(password)=>{
            if(password===this.state.password){
                this.setState({
                    writtenPassword:password,
                    isPasswordTrue:true,
                    passwordModalIsOpen:false
                })
            }else{
                alert('PAROL XATO')
            }
        }

        const setPasswordAsFalse = ()=>{
            this.setState({
                passwordModalIsOpen:false,
                writtenPassword:'',
                isPasswordTrue:false
            })
        }


        const openOrCloseSettingsModal = (type) =>{

            if(type===true && isPasswordTrue){
                this.setState({
                    modalSettingsIsOpen:true
                })
            }else if(type===true && isPasswordTrue===false){
                alert('PAROL KIRGIZING')
            }else{
                this.setState({
                    modalSettingsIsOpen:false
                })
            }


        }

        const setNewSettings = (values) =>{



            this.setState({
                totalTimeInSeconds:values.totalTimes,
                roundsNo:values.roundsNumber,
                breakTimeInSecond:values.breakTimeInSec,
                timeIfNeed:values.totalTimes,
                timeIfNeedBreak:values.breakTimeInSec,
                modalSettingsIsOpen:false,
            })
            alert('NASTROYKA OZGARDI')
        }

        const startMatch = () =>{
            if(isPasswordTrue){
                this.setState({
                    isPaused:false,
                    currentRound:1,
                    isMatchGoing:true
                })
            }else{
                alert('PAROL KIRGIZING')
            }
        }


        const onFinishRound = () =>{

            let currentRoundAsVar = currentRound+1
            if(currentRoundAsVar<=roundsNo){
                alert(currentRound+ ' - round tugadi TANAFFUS')
                this.setState({
                    isPausedBreakTime:false,
                    isPaused:true,
                })

            }else{
                this.setState({
                    isMatchGoing:false
                })

                if(redSidePoints>blueSidePoints){
                    this.setState({
                        winner:'red'
                    })
                }else if(redSidePoints<blueSidePoints){
                    this.setState({
                        winner:'blue'
                    })
                }else{
                    this.setState({
                        winner:''
                    })
                }

                this.setState({
                    modalResultIsOpen:true
                })
            }
        }

        const onFinishBreakTime = () =>{

            if(currentRound+1!==roundsNo){
                document.getElementsByClassName('reset-button').item(1).click()
            }

            let currentRoundAsVar = currentRound+1
            alert(currentRoundAsVar + ' - ROUND BOSHLANDI')
            this.setState({
                currentRound:currentRoundAsVar,
                isPausedBreakTime:true,
                isPaused:false
            })

            document.getElementsByClassName('reset-button').item(0).click()

        }

        const openOrCloseResultModal = (type) =>{
            this.setState({
                modalResultIsOpen:type
            })
        }

        const finishMatch = () => {
            document.getElementsByClassName('reset-button').item(0).click()
            document.getElementsByClassName('reset-button').item(1).click()

            let arr = []

            for(let i = 0; i < maxViolations ; i++){
                arr.push(i)
            }

            this.setState({
                modalResultIsOpen:false,
                redSideViolations:[],
                redSidePoints:0,
                blueSideViolations:[],
                blueSidePoints:0,
                isPaused:true,
                isPausedBreakTime:true,
                winner:'',
                currentRound:0,
                isMatchGoing:false
            })
        }

        const pauseOrStartMatch = () =>{
            this.setState({
                isPaused:!isPaused
            })
        }

        const restart = () =>{
            document.getElementsByClassName('reset-button').item(0).click()
            document.getElementsByClassName('reset-button').item(1).click()
            this.setState({
                isMatchGoing:false,
                isPaused:true,
                isPausedBreakTime:true,
                redSidePoints:0,
                blueSidePoints:0,
                winner:'',
                redSideViolations:[],
                blueSideViolations:[],
                currentRound:0,


            })
        }



        return(
            <div className={"container-fluid"}>

                <div>

                    <div>
                        <Modal
                            isOpen={passwordModalIsOpen}
                            onRequestClose={()=>openOrClosePasswordModal(false)}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <button className={'btn btn-danger'} style={{marginLeft:"30%", marginBottom:"10%"}} onClick={()=>openOrClosePasswordModal(false)}>YOPISH</button>
                            <Formik
                                initialValues={{ password:writtenPassword }}
                                onSubmit={async values => {
                                    checkPasswordIsTrue(values.password)
                                }}
                            >
                                {props => {
                                    const {
                                        values,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                id="password"
                                                placeholder="parolni kiriting"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    'form-control'
                                                }
                                            />

                                            {
                                                isPasswordTrue? <button className={'btn btn-warning mt-5'} onClick={setPasswordAsFalse}> Dasturni quliflash </button>: <button  type="submit" className={'ml-2 mt-5 d-inline-block w-100         btn btn-outline-success'} >
                                                    KIRIT
                                                </button>
                                            }


                                        </form>
                                    );
                                }}
                            </Formik>


                        </Modal>
                    </div>

                    <div>
                        <Modal
                            isOpen={modalSettingsIsOpen}
                            onRequestClose={()=>openOrCloseSettingsModal(false)}
                            style={customStyles}
                            contentLabel="Settings modal"
                        >
                            <button className={'btn btn-danger'} style={{marginLeft:"40%"}} onClick={()=>openOrCloseSettingsModal(false)}>YOPISH</button>
                            <Formik
                                initialValues={{ totalTimes: totalTimeInSeconds , roundsNumber:roundsNo, maximumViolationsNum:maxViolations,breakTimeInSec:breakTimeInSecond }}
                                onSubmit={async values => {
                                    setNewSettings(values)
                                }}
                            >
                                {props => {
                                    const {
                                        values,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className="container mt-5">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="">Roundlar vaqti ( sekundda )</label>
                                                        <input
                                                            id="totalTimes"
                                                            placeholder="Roundlar vaqti"
                                                            type="number"
                                                            value={values.totalTimes}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={
                                                                'form-control'
                                                            }
                                                        />

                                                        <label htmlFor="">Roundlar soni</label>

                                                        <input
                                                            id="roundsNumber"
                                                            placeholder="roundlar soni"
                                                            type="number"
                                                            value={values.roundsNumber}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={
                                                                'form-control mt-3'
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="">Tanaffus vaqti ( sekundda )</label>
                                                        <input
                                                            id="breakTimeInSec"
                                                            placeholder="tanaffus vaqti"
                                                            type="number"
                                                            value={values.breakTimeInSec}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={
                                                                'form-control '
                                                            }
                                                        />
                                                    </div>

                                                    <button  type="submit" className={'ml-2 mt-5 d-inline-block w-100         btn btn-outline-success'} >
                                                        KIRIT
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    );
                                }}
                            </Formik>
                        </Modal>
                    </div>

                    <div>
                        <Modal
                            isOpen={modalResultIsOpen}
                            onRequestClose={()=>openOrCloseResultModal(false)}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <button className={"btn btn-success mb-3"} onClick={finishMatch}>YOPISH VA QAYTADDAN BOSHLASH</button>

                            {
                                winner==="red"?<div style={{backgroundColor:'red'}}>
                                    <h1 className={'text-white text-center'}>HONG WIN</h1>
                                </div>:winner==='blue'?<div style={{backgroundColor:'blue'}}>
                                    <h1 className={'text-white text-center'}>CHONG WIN</h1>
                                </div>:<div>

                                </div>
                            }





                        </Modal>
                    </div>


                </div>

                <div className="row" style={{backgroundColor:"#BBBBBB"}}>
                    
                    <div className="col-12">
                         <span className={"d-inline-block mt-5 mb-5"} style={{marginLeft:"50px", width:"80px"}} >
                             {
                                 isMatchGoing===false?
                                     <Settings onClick={()=>openOrCloseSettingsModal(true)} onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>:
                                     <Settings onClick={()=>openOrCloseSettingsModal(false)} onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>

                             }
                         </span>


                        <span className={"d-inline-block "} style={{marginLeft:"10px", width:"80px"}} >
                            {
                                isMatchGoing===false?
                                    <img src={play} alt="" onClick={startMatch} onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>:
                                    <img src={play} alt="" onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>

                            }
                        </span>

                        <span className={"d-inline-block "} style={{marginLeft:"10px", width:"80px"}} >
                            {
                                isMatchGoing===false?
                                    <img src={stop} alt="" onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>:
                                    <img src={stop} alt="" onClick={pauseOrStartMatch} onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>
                            }
                        </span>

                        <span className={"d-inline-block "} style={{marginLeft:"10px", width:"80px"}} >
                            {
                                isMatchGoing===false?
                                    <img src={restartPng} alt="" onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>:
                                    <img src={restartPng} alt="" onClick={restart} onMouseOver={changeBackground} onMouseLeave={getBackBackground}/>
                            }
                        </span>

                        <div className={'position-absolute px-5'} style={{top:"2%", left:"45%" , backgroundColor:'#898f8a'}}>
                            <h1 style={{fontSize:"60px", color:'white',marginLeft:'35px'}} >{currentRound}</h1>
                            <h3 style={{fontWeight:"bold",color:'white'}}>ROUND</h3>
                        </div>
                        
                        <div className={'position-absolute'} style={{top:"7%",left:"90%"}}>
                            {
                                isMatchGoing===false?
                                    <img src={lock} onClick={()=>openOrClosePasswordModal(true)}  onMouseOver={changeBackground} onMouseLeave={getBackBackground} alt=""/>
                                    :
                                    <img src={lock} onClick={()=>openOrClosePasswordModal(false)}  onMouseOver={changeBackground} onMouseLeave={getBackBackground} alt=""/>

                            }
                        </div>


                        <div className={'position-absolute'} style={{top:"9%",left:"65%"}}>
                            {
                              isPasswordTrue?<h4 style={{color:'green'}}>DASTUR ISHLASHGA TAYYOR</h4>:<h4 style={{color:'red'}}>PAROL KIRITILMAGAN</h4>
                            }
                        </div>


                    </div>


                    
                </div>
                <div className="row" style={{height:"80vh"}}>


                    <div className={'d-inline-block'} style={{position:'absolute', left:'41%', top:'25%' , width:'450px' }} >
                        <div  style={{backgroundColor:"rgba(0,0,0,.4)" , color:"white", fontSize:'60px'}} className={'d-inline-block p-3'}>
                            <Timer
                                durationInSeconds={totalTimeInSeconds}
                                isPaused={isPaused}
                                showResetButton={true}
                                onFinish = {()=> onFinishRound() }
                            />



                        </div>
                        </div>

                    <div className={'d-inline-block break-timer'} style={{position:'absolute', left:'41%', top:'50%', width:'450px' }} >
                        <div  style={{backgroundColor:"rgba(240,255,0,.8)" , color:"white", fontSize:'60px'}} className={'d-inline-block p-3 '}>
                            <Timer
                                durationInSeconds={breakTimeInSecond}
                                isPaused={isPausedBreakTime}
                                showResetButton={true}
                                onFinish = {()=> onFinishBreakTime()}
                            />



                        </div>
                    </div>

                    <div className="col-6 p-1">

                        <div style={{backgroundColor:"red" , height:'80vh' , borderRadius:"5px", border:'1px'}}>

                            <h1 className={'text-center text-white '} style={{paddingTop:'10%', fontSize:'60px'}}>HONG</h1>
                            <h1 className={'text-center'}
                                style={{
                                    color:"white",
                                    fontWeight:"bold",
                                    fontSize:"300px",

                                }}
                            >
                                {
                                    redSidePoints
                                }
                            </h1>



                            <div style={{marginLeft:'25%'}}>
                                {
                                    redSideViolations.map((item)=>{
                                        return(
                                            <span style={{height:"25px" , width:"25px" , backgroundColor:'white',display:'inline-block', marginLeft:'5px',marginTop:'50px'}}>

                                            </span>
                                        )
                                    })
                                }
                            </div>



                        </div>





                    </div>
                    <div className="col-6 p-1 ">

                        <div style={{backgroundColor:'blue' ,  height:'80vh', borderRadius:"5px", border:'1px'}}>
                            <h1 className={'text-center text-white '} style={{paddingTop:'10%' , fontSize:'60px'}}>CHONG</h1>

                            <h1 className={'text-center'}
                                style={{
                                    color:"white",
                                    fontWeight:"bold",
                                    fontSize:"300px",
                                }}
                            >
                                {
                                    blueSidePoints
                                }
                            </h1>

                            <div style={{marginLeft:'25%'}}>
                                {
                                    blueSideViolations.map((item)=>{
                                        return(
                                            <span style={{height:"25px" , width:"25px" , backgroundColor:'white',display:'inline-block', marginLeft:'5px',marginTop:'50px'}}>

                                            </span>
                                        )
                                    })
                                }
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Tablo;