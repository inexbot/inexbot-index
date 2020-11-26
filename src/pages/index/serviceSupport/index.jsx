import React, { useState, useEffect } from "react";
import  "./index.module.less";
import { RightCircleOutlined } from '@ant-design/icons';


function serviceSupport(props){
  const [contentList, setContentList] = useState(null);

  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    for(let i=0; i<props.TypeList.length; i++){
      if(props.TypeList[i].id === 34){
        setContentList(props.TypeList[i])
        console.log(props.TypeList[i],"服务支持")
      }
    }
  },[props.TypeList])

  return(
    <div style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
      {contentList === null ? "" : 
        <div  className="serviceSupport">
          <div className="serviceSupport_top">
            <p> {contentList.typename} </p>
            <p> {contentList.typenameen} </p>
          </div>
          <p > {contentList.content.slice(0,25)} </p>
          <div className="serviceSupport_content">
            { contentList.sublist.map((item,index)=>{
              return (
                <div key={index}>
                  <p>{item.typename}</p>
                  <img src={require(`images/icon_sp${index+1}.png`)} alt=""/>
                  <span className="serviceSupport_content_bx"></span>
                  <RightCircleOutlined className="serviceSupport_content_icon" />
                </div>
              )
            }) }
          </div>
        </div>
      }
    </div>
  )
}

export default serviceSupport