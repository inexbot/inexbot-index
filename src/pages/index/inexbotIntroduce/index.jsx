import React, { useState, useEffect } from "react";
import API from "components/API/api";
import {Button} from "antd"
import "./index.module.less";


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
//   
  return(
    <div className="inexboot_introduce" style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
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
        <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/video.jpg" alt=""/>
      </div>
      <video id="movie" style={{ width:props.BannerWidth,height:props.BannerHeight,display:videoShow}} controls 
        autoPlay
       >
        {/* <source src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/video.mp4" type="video/mp4"/> */}
      </video>
    <Button style={{ display:videoShow,position:"fixed",top:"0",right:"0",zIndex:"10001" }} onClick={()=>{
      setVideoShow("none")
      document.body.style.overflowY = "auto";
      let video = document.getElementById('movie');
      video.pause()
    }}>关闭</Button>
    </div>
  )
}

export default inexbotIntroduce