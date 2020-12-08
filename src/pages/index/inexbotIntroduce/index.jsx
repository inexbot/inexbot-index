import React, { useState, useEffect } from "react";
import {Button} from "antd"
import "./index.module.less";
import bg_1 from "images/bg-1.jpg";


function inexbotIntroduce(props){
  const [inexbotTxtl, setInexbotTxtl] = useState(null)
  const [videoShow, setVideoShow] = useState("none");
  // 更新总数据
  useEffect(()=>{
    if( props.TypeList !== null ){
      for(let i=0; i<props.TypeList.length; i++){
        if( props.TypeList[i].id === 1 ){
          setInexbotTxtl(props.TypeList[i].sublist[0].content)
        }
      }
    }
  },[props.TypeList])
  return(
    <div style={{ background:`url(${bg_1}) no-repeat`,backgroundSize:"100%  100%" }} className="inexbot_Introduce">
      <div className="inexboot_introduce" >
        <div className="inexbot_lf">
          <div className="header_Txt">
            <span>智能</span>
            <span>简单</span>
            <span>互联</span>
          </div>
          <div dangerouslySetInnerHTML={inexbotTxtl===null? {__html:"<div> </div>"}:{__html:inexbotTxtl}}>
          </div>
        </div>
        <div className="inexbot_rt" onClick={()=>{
          setVideoShow("block")
          document.body.style.overflowY = "hidden"
          let video = document.getElementById('movie');
          video.play()
        }}>
          <img src={require(`images/video.jpg`)} alt=""/>
        </div>
        <video id="movie" style={{ width:"100vw",height:"100vh",display:videoShow}} controls >
          <source src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/video.mp4" type="video/mp4"/>
        </video>
      <Button style={{ display:videoShow,position:"fixed",top:"0",right:"0",zIndex:"10001" }} onClick={()=>{
        setVideoShow("none")
        document.body.style.overflowY = "auto";
        let video = document.getElementById('movie');
        video.pause()
      }}>关闭</Button>
      </div>
    </div>
  )
}

export default inexbotIntroduce