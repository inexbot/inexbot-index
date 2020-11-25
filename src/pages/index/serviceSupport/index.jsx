import React, { useState, useEffect } from "react";
import API from "components/API/api";
import  "./index.module.less";


function serviceSupport(props){
  const [contentList, setContentList] = useState(null);

  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    for(let i=0; i<props.TypeList.length; i++){
      if(props.TypeList[i].id === 34){
        setContentList(props.TypeList[i])
        console.log(props.TypeList[i].sublist)
      }
    }
  },[props.TypeList])

  return(
    <div style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
      {contentList === null ? "" : 
        <div  className="serviceSupport">
          <div className="serviceSupport_top">
            <p> {contentList.typename} </p>
            <p> SERVICESUPPORT </p>
          </div>
          <p > {contentList.content.slice(0,25)} </p>
          <div className="serviceSupport_content">
            { contentList.sublist.map((item,index)=>{
              return (
                <div key={index}>
                  <p>{item.typename}</p>
                  {/* <div  dangerouslySetInnerHTML={ index=== 1?{__html:"<div> </div>"}:index=== 3?{__html:"<div> </div>"}:{__html:item.content}}>

                  </div> */}
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