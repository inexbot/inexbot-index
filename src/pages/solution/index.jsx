import React, {useEffect, useState} from "react";
import { connect } from "umi";
import Banner from "components/banner/index"
import image from "images/faq-bg.jpg"
import "./index.module.less";

const mapStateToProps = state =>{
  return{
    headerScroll: state.index.headerScroll,
  }
}

function Solution(props){
  const [TypeList, setTypeList] = useState(null);
  const [solutionNum, setSolutionNum] = useState(['Pallet', 0]);
  const [newCenter, setNewCenter] = useState(null);
  const [multirobotPhoto, setMultirobotPhoto] = useState(null);

  // 获取解决方案页面的全部数据
  useEffect(()=>{
    if( props.TypeList === null ){
      return;
    }
    props.TypeList.map((item,index)=>{
      if( item.id === 25 ){
        setTypeList(item)
        // console.log(item,"这里是解决方案页面")
      }
    })
  },[props.TypeList])

    // 更新滚动高度header颜色改变
    useEffect(()=>{
      let num = 0;
      if( props.BannerWidth <760 ){
        num = 200
      }else if( props.BannerWidth > 760 &&  props.BannerWidth < 1200  ){
        num = 280
      }else{
        num = 500
      }
      props.dispatch({
        type:"index/setHeaderScreoll",
        data:num
      })
    },[props.BannerWidth])

  // 根据选择不同的模块显示不同的中心内容
  useEffect(()=>{
    if( TypeList === null ){
      return;
    }
    TypeList.sublist.map((item,index)=>{
      if( item.typenameen === solutionNum[0] ){
        setNewCenter(item.content)
        console.log(item)
      }
    })
  },[solutionNum,TypeList])

  // 获取多机协作模块的两张照片
  useEffect(()=>{
    if(props.productList === null){
      return;
    }
    let DataList = [];
    props.productList.list.map((item,index)=>{
      if(item.id === 135 || item.id === 136 ){
        DataList.push(item);
      }
    })
    setMultirobotPhoto(DataList)
    console.log(DataList)
  },[props.productList])


  return(
    <div>
      { TypeList === null?"" :
        <div className="children_solution">
          <Banner data={{
            BannerImg:image,
            BannerSize:"150%",
            BannerLeft:"40%",
            TxtCh:"解决方案",
            TxtEn:"SOLUTION",
          }}
          ></Banner>
          <div className="solution_select_All">
            <ul className="solution_select">
              {TypeList.sublist.map((item,index)=>{
                return(
                  <li key={index} onClick={()=>{
                    setSolutionNum([item.typenameen,index])
                  }} >
                    <a  className={index === solutionNum[1]? "hoversolutionTbs":"solutionTbs"}>
                      <p>{item.typename}</p>
                      <span></span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="multirobot">
          <div className="multirobot_photo">
              { multirobotPhoto === null? "" : 
                multirobotPhoto.map((item,index)=>{
                  return(
                    <div key={index} style={ solutionNum[0] ===  "MultiRobot"?{ display:"block" } : {display:"none"}} >
                      <img src={item.litpic} alt=""/>
                      <p>{ item.title }</p>
                    </div>
                  )
                })
               }
            </div>
            <div className={ solutionNum[0] ===  "MultiRobot"? "multirobot_center" : "multirobot_center_l"} dangerouslySetInnerHTML={newCenter===null? {__html:"<div> </div>"}:{__html:newCenter}}>
              
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(Solution);

