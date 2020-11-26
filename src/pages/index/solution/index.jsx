import React, { useState, useEffect } from "react";
import API from "components/API/api";
import style from "./index.module.less";
import banner3 from "images/banner3.jpg";


function Solution(props){
  const [dataList, setDataList] = useState([]);
  const [TypeList, sendTypeList] = useState(null);
  useEffect(()=>{
    API.getSolutionType().then(res=>{
      res.list.splice(2,1)
      res.list.splice(6,1)
      setDataList(res.list)
    })
  },[])
  useEffect(()=>{
    if(props.TypeList === null){
      return;
    }
    for(let i=0; i<props.TypeList.length; i++){
      if( props.TypeList[i].id === 25 ){
        sendTypeList(props.TypeList[i])
        console.log(props.TypeList[i],"解决方案")
      }
    }
  },[props.TypeList])
  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
  }
  return(
    <div className={style.solution} style={{padding:`0 ${(props.BannerWidth-1280)/2.6}px`}}>
      <div className={style.solution_top}>
        <p> {TypeList === null? "":TypeList.typename} </p>
        <p> {TypeList === null? "":TypeList.typenameen}</p>
      </div>
      <p> 我们期待，未来每一台机器人的背后，都有纳博特的技术 </p>
      <div className={style.solution_btm}>
        { dataList.map((item,index)=>{
            return (
              <div  key={index} style={{ width:"33%",height:"282px",background:`url(${banner3}) no-repeat`,backgroundSize:"533px"}} onClick={()=>{
                location.href = getLink(item.typedir)
              }} >
                <span className={style.solution_btm_txt}> {item.typename} </span>
                <div className={style.solution_btn_opc}>
                  <img src={require(`images/icon${index+1}.png`)} alt=""/>
                  <p > {item.description.slice(0,21)}</p>
                  { item.description.length <21? "":
                    <span> {item.description.slice(21)} </span>
                  }
                </div>
              </div>
            )
        }) }
      </div>
    </div>
  )
}

export default Solution