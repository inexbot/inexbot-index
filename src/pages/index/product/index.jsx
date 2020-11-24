import React, { useState, useEffect } from "react";
import API from "components/API/api";
import "./index.css"
import style from "./index.module.less";


function Product(props){
  const [productHedList, setProductHedList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [productNum, setProductNum] = useState(0);
  const [productData, setProductData] = useState([[],[],[],[],[]]);

  useEffect(()=>{
    // 更新产品中心的标签页
    if( props.TypeList !== null ){
      props.TypeList.map((item,index)=>{
        if( item.id === 14 ){
          setProductHedList(item)
        }
      })
    }
  },[props.TypeList])

  // 更新产品中心的主要数据
  useEffect(()=>{
    if( props.productList !== null ){
      let List = [];
      for(let i=0; i<props.productList.list.length;i++){
        if( props.productList.list[i].typeid === 15 || props.productList.list[i].typeid === 16 || props.productList.list[i].typeid === 17
           || props.productList.list[i].typeid === 18 || props.productList.list[i].typeid === 43  ){
          List.push(props.productList.list[i]);
        }
      }
      setProductList(List)
    }
  },[props.productList])

  // 点击切换主要产品
  useEffect(()=>{
    if( productList !== null ){
      for( let i=0; i<productList.length;i++ ){
        if(productList[i].typeid === 15){
          productData[0].push(productList[i])
        }else if(productList[i].typeid === 16){
          productData[1].push(productList[i])
        }else if(productList[i].typeid === 17){
          productData[2].push(productList[i])
        }else if(productList[i].typeid === 18){
          productData[3].push(productList[i])
        }else if(productList[i].typeid === 43){
          productData[4].push(productList[i])
        }
      }
      console.log(productData)
    }
    console.log(productNum)
  },[productNum,productList])

  // 产品介绍数据
  useEffect(()=>{
    API.getProductIntroduce().then(res=>{
      setProductList(res.list[4].body)
    })
  },[])

  return(
    <div className={style.productAll} style={{padding:`0 ${(props.BannerWidth-1280)/2}px`}}>
      <div className={style.product_top}>
        <p> 产品中心 </p>
        <p> PRODUCT </p>
      </div>
      <p>  </p>
      <div className={style.product_hedlist}>
        { productHedList ===null?"":
           productHedList.sublist.map((item,index)=>{
            return(
              <li key={index} >
                <a className={productNum === index? style.hoverproductTbs:style.productTbs} onClick={()=>{setProductNum(index);console.log(index+1)}} >{item.typename} <span></span></a>
              </li>
            )
        })}
      </div>
      <div className={style.product_center}>
      <div className={style.product_center_list} >
        { productList === null? "" : productData[productNum].map((item,index)=>{
          return(
            <div key={index}>
              <div className={style.product__center_l}
              //  dangerouslySetInnerHTML={{ __html:productList }}
               >
                <p> {item.description} </p>
                <img src={item.litpic} alt=""/>
                {/* <span>NRC系列工业机器人控制系统采用EtherCAT总线技术，兼容IEC61131-3标准，支持各类EtherCAT模块;基于X86 IPC+RTOS设计，采用自主研发控制算法，支持六关节自由度机器人、SCARA机器人、五轴机器人、连杆码垛机机器人、四轴多关节机器人、DELTA机器人、直角坐标机器人、多轴专用机器人等多种机器人的控制。</span> */}
              </div>
              { index === 1 || (index - 1)%3=== 0 ?
                <div className={style.product__center_l}
                //  dangerouslySetInnerHTML={{ __html:productList }}
                 >
                  <p> {item.description} </p>
                  <img src={item.litpic} alt=""/>
                  {/* <span>NRC系列工业机器人控制系统采用EtherCAT总线技术，兼容IEC61131-3标准，支持各类EtherCAT模块;基于X86 IPC+RTOS设计，采用自主研发控制算法，支持六关节自由度机器人、SCARA机器人、五轴机器人、连杆码垛机机器人、四轴多关节机器人、DELTA机器人、直角坐标机器人、多轴专用机器人等多种机器人的控制。</span> */}
                </div>
                : index%2 === 0?
                <div className={style.product__center_rt}>
                <img src={item.litpic} alt=""/>
                  <p>{item.description}</p>
                </div>
                :
                <div className={style.product__center_rb}>
                <img src={item.litpic} alt=""/>
                  <p>{item.description}</p>
                </div>
               }
              {/* <div className={style.product__center_r}>
                <div className={style.product__center_rt}>
                <img src={item.litpic} alt=""/>
                  <p>{item.description}</p>
                </div>
                <div className={style.product__center_rb}>
                <img src={item.litpic} alt=""/>
                  <p>{item.description}</p>
                </div>
              </div> */}
            </div>
          )
        }) }
        </div>
      </div>
    </div>
  )
}

export default Product;