import React, { useState, useEffect } from "react";
import  "./index.module.less";
import { RightCircleOutlined } from '@ant-design/icons';


function serviceSupport(props){
  const [contentList, setContentList] = useState(null);

  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
  }

  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    for(let i=0; i<props.TypeList.length; i++){
      if(props.TypeList[i].id === 34){
        setContentList(props.TypeList[i])
        console.log(props.TypeList[i],"这里是服务支持模块")
      }
    }
  },[props.TypeList])

  return(
    <div style={props.BannerWidth > 1200?{padding:`0 ${(props.BannerWidth-1200)/2.6}px`}:{}}>
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
                <div key={index}onClick={()=>{
                  location.href = getLink(item.typedir)
                }}>
                  <p >{item.typename}</p>
                  <div >
                    <img src={require(`images/icon_sp${index+1}.png`)} alt=""/>
                  </div>
                  <div>
                    <span className="serviceSupport_content_bx"></span>
                  </div>
                  <RightCircleOutlined className="serviceSupport_content_icon"/>
                  <span className="serviceSupport_content_description">{item.description}</span>
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