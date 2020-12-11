import React, {useEffect, useState} from "react";
import API from "components/API/api.js";
import {connect} from "umi";
import Banner from "components/banner";
import style from  "./index.module.less";

const mapStateToProps = state =>{
  return{
    
  }
}

function TeachVideo(props){
  const [videoSelect, setVideoSelect] = useState("smallClass");
  const [TypeList, setTypeList] = useState(null);
  const [videoList, setVideoList] = useState(null);

  // 获取视频
  useEffect(()=>{
    API.getTeachvideo().then(res=>{
      let DataList = { smallClass:[],openPlateForm:[] };
      console.log(res,'这里是教学视频内容')
      res.list.map((item,index)=>{
        if(item.typeid === 60){
          DataList.smallClass.push(item)
        }else if( item.typeid === 68 ){
          DataList.openPlateForm.push(item)
        }
      })
      console.log(DataList)
      setVideoList(DataList)
    })
  },[])

  // 获取banner图上的文字和图片
  useEffect(()=>{
    // console.log(props.TypeList,"教学视频")
    if( props.TypeList === null ){
      return;
    }
    props.TypeList.map((Item,Index)=>{
      if(Item.id === 34){
        Item.sublist.map((item,index)=>{
          if(item.id === 37){
            setTypeList(item)
          }
        })
      }
    })
  },[props.TypeList])

  return(
    <div className={style.children_teachvideo}>
      { TypeList === null? " ": 
        <div>
          <Banner data={{
            BannerImg:TypeList.typeimg,
            BannerSize:"100%",
            BannerLeft:"0%",
            TxtCh:TypeList.typename,
            TxtEn:TypeList.typenameen,
          }}
          ></Banner>
          <ul className={style.teachvideo_select}>
            <li className={ videoSelect === "smallClass"?  style.teachvideo_centre_h : style.teachvideo_centre }  onClick={()=>{
                setVideoSelect("smallClass")
            }}> 纳博特小课堂 </li>
            <li className={ videoSelect === "openPlateForm"?  style.teachvideo_centre_h: style.teachvideo_centre } onClick={()=>{
                setVideoSelect("openPlateForm")
            }}> 开放平台教学视频 </li>
          </ul>
          <div className={style.teachvideo_centre}>
              { videoList=== null? "" : videoList[videoSelect].map((item,index)=>{
                return(
                  <div key={index} className={style.teachvideo_centre_children}>
                    <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png" alt=""/>
                    <p>{item.chap} &nbsp; &nbsp;{item.name}</p>
                  </div>
                )
              }) }
          </div>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(TeachVideo);