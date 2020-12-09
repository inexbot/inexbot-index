import React, {useEffect, useState} from "react";
import { connect } from "umi";
import Banner from "components/banner/index"
import image from "images/faq-bg.jpg"
import style from "./index.module.less";

const mapStateToProps = state =>{
  return{
    headerScroll: state.index.headerScroll,
  }
}

function Solution(props){
  const [TypeList, setTypeList] = useState(null);
  const [solutionNum, setSolutionNum] = useState(['Pallet', 0]);
  const [newCenter, setNewCenter] = useState(null);

  // 获取解决方案页面的全部数据
  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    props.TypeList.map((item,index)=>{
      if( item.id === 25 ){
        setTypeList(item)
        console.log(item,"这里是解决方案页面")
      }
    })
  },[props.TypeList])

  // 根据选择不同的模块显示不同的中心内容
  useEffect(()=>{
    if( TypeList === null ){
      return;
    }
    TypeList.sublist.map((item,index)=>{
      // console.log(item)
      if( item.typenameen === solutionNum[0] ){
        setNewCenter(item.content)
        console.log(item.content)
      }
    })
    // console.log(TypeList)
  },[solutionNum,TypeList])

  return(
    <div>
      { TypeList === null?"" :
        <div className={style.solution}>
          <Banner data={{
            BannerImg:image,
            BannerSize:"150%",
            BannerLeft:"40%",
            TxtCh:"解决方案",
            TxtEn:"SOLUTION",
          }}
          ></Banner>
          <ul className={style.solution_select}>
            {TypeList.sublist.map((item,index)=>{
              return(
                <li key={index} onClick={()=>{
                  setSolutionNum([item.typenameen,index])
                }} >
                  <a  className={index === solutionNum[1]? style.hoversolutionTbs:style.solutionTbs}>
                    <p>{item.typename}</p>
                    <span></span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className={style.solution_center} dangerouslySetInnerHTML={newCenter===null? {__html:"<div> </div>"}:{__html:newCenter}}>

          </div>
        </div>
      }

    </div>
  )
}

export default connect(mapStateToProps)(Solution);

