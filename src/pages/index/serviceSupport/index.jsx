import React, { useState, useEffect } from "react";
import API from "components/API/api";
import  "./index.module.less";


function serviceSupport(props){
  const [contentList, setContentList] = useState(props.TypeList);

  useEffect(()=>{
    
  },[props.TypeList])

  return(
    <div className="serviceSupport" style={{padding:`0 ${(props.BannerWidth-1280)/2}px`}}>
      <div className="serviceSupport_top">
        <p> 服务支持 </p>
        <p> SERVICESUPPORT </p>
      </div>
      <p> 我们期待，未来每一台机器人的背后，都有纳博特的技术 </p>
    </div>
  )
}

export default serviceSupport