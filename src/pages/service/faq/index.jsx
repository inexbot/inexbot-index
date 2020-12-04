import React, { useState, useEffect } from 'react';
import style from "./index.module.less";
import Banner from 'components/banner/index.jsx'


function Faq(props){
  useEffect(()=>{
    console.log(props)
  },[])
  return(
    <div className={style.faq}>
      <Banner bannerImg={"https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/banner1.jpg"}></Banner>
    </div>
  )
}

export default Faq;