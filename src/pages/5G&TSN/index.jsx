import React,{useEffect, useState} from "react";
import style from "./index.module.less";
import {connect} from "umi";

const mapStateToProps = state =>{
  return{
    
  }
}

function TSN(props){
  const [TypeList, setTypeList] = useState(null);

  // 获取全部的数据
  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    props.TypeList.map((item,index)=>{
      if(item.id === 11){
        setTypeList(item)
      }
    })
  },[props.TypeList])

  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);
  return(
    <div className={style.tsn_5gFs}>
      <div className={style.bgr}></div>
      <div  className={style.tsn_5g} dangerouslySetInnerHTML = {TypeList === null?{ __html: '<div> </div>' }: { __html:TypeList.content}}>

      </div>
    </div>
  )
}

export default connect(mapStateToProps)(TSN);