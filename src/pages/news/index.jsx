import React, { useEffect , useState} from "react";
import { connect } from "umi";
import style from "./index.module.less";
import { Pagination, Button } from "antd";
import Banner from "components/banner/index"

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

  // 修改分页的显示样式
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <Button> 上一页 </Button>;
    }
    if (type === 'next') {
      return <Button> 下一页 </Button>;
    }
    return originalElement;
  }

  return(
    <div>
      { TypeList === null? "":
        <div className={style.news}>
          <Banner data={{
            BannerImg:"https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/server/video.jpg",
            TxtCh:TypeList.typename ,
            TxtEn:TypeList.typenameen,
            Height:500
          }}
          ></Banner>
          <div className={style.newslist_select}>
            {TypeList.sublist.map((item,index)=>{
              return(
                <div key={index} className={ index===0 ? newSelect === "company" ?style.newslist_select_children_h : style.newslist_select_children:
                 newSelect === "industry"?style.newslist_select_children_h : style.newslist_select_children }
                  onClick={()=>{
                    setnewListPage(1)
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
                    <div className={style.newlist_center_img}>
                      <img src={item.litpic} alt=""/>
                    </div>
                    <p className={style.newlist_center_title}> {item.title} </p>
                    <p className={style.newlist_center_dis} > {item.description} </p>
                    <span className={style.newlist_center_date} >{`
                      ${new Date((item.pubdate)*1000).getFullYear()} -
                      ${new Date((item.pubdate)*1000).getMonth()+1 < 10?'0'+( new Date((item.pubdate)*1000).getMonth()+1) :new Date(item.pubdate*1000).getMonth()+1} -
                      ${new Date((item.pubdate)*1000).getDate()<10? '0'+ new Date((item.pubdate)*1000).getDate() :new Date((item.pubdate)*1000).getDate()}
                      `
                    }</span>
                  </div>
                )
              })
            }
            <Pagination className={style.newlist_bottom_page} current={newListPage} itemRender={itemRender} total={productList===null?1:productList[newSelect].length} onChange={(page, pageSize)=>{
              console.log(page,pageSize)
              setnewListPage(page)
              window.scrollTo(0,361)
            }} />
          </div>

        </div>
      }

    </div>
  )
}

export default connect(mapStateToProps)(News);