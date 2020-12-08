import React, { useEffect , useState} from "react";
import { connect } from "umi";
import style from "./index.module.less";
import { Pagination } from "antd";
import Header from "components/banner/index"

const mapStateToProps = state => {
  return{
    headerScroll: state.index.headerScroll,
  }
}

function News(props){
  const [TypeList, setTypeList] = useState(null);
  const [newSelect, setNewsSelect] = useState("company");
  const [productList, setProductList] = useState(null);
  const [newListPage, setnewListPage] = useState(1);

  // 更新滚动高度header颜色改变
  useEffect(()=>{
    props.dispatch({
      type:"index/setHeaderScreoll",
      data:420
    })
  },[])

  useEffect(()=>{
    let dataList = {company:[],industry:[]};
    if( props.productList  === null ){
      return;
    }
    for(let i=0; i<props.productList.list.length; i++){
      if(props.productList.list[i].typeid === 8){
        dataList.company.push(props.productList.list[i])
      }else if(props.productList.list[i].typeid === 9){
        dataList.industry.push(props.productList.list[i])
      }
    }
    console.log(dataList,"这里是新闻资讯页面S")
    setProductList(dataList)
  },[props.productList])

  // 获取数据
  useEffect(()=>{
    if( props.TypeList !== null ){
      props.TypeList.map((item,index)=>{
        if(item.id === 7){
          setTypeList(item);
          console.log(item);
        }
      })
    }
  },[props.TypeList])

  return(
    <div>
      { TypeList === null? "":
        <div className={style.news}>
          <Header data={{
            BannerImg:"https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/video.jpg",
            TxtCh:TypeList.typename ,
            TxtEn:TypeList.typenameen,
            Height:500
          }}
          ></Header>
          <div className={style.newslist_select}>
            {TypeList.sublist.map((item,index)=>{
              return(
                <div key={index} className={ index===0 ? newSelect === "company" ?style.newslist_select_children_h : style.newslist_select_children:
                 newSelect === "industry"?style.newslist_select_children_h : style.newslist_select_children }
                  onClick={()=>{
                    if( index === 0 ){
                      setNewsSelect("company")
                    }else{
                      setNewsSelect("industry")
                    }
                }}>
                  {item.typename}
                </div>
              )
            })}
          </div>
          <div className={style.newlist}>
            { productList === null? "":
              productList[newSelect].slice((newListPage-1)*9,(newListPage-1)*9+9).map((item,index)=>{
                return(
                  <div key={index} className={style.newlist_center}>
                    <img src={item.litpic} alt=""/>
                  </div>
                )

              })
            }
            <Pagination defaultCurrent={1} total={50} onChange={(page, pageSize)=>{
              console.log(page,pageSize)
              setnewListPage(page)
            }} />
          </div>

        </div>
      }

    </div>
  )
}

export default connect(mapStateToProps)(News);