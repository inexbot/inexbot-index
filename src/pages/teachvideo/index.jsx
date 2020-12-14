import React, {useEffect, useState} from "react";
import API from "components/API/api.js";
import { connect } from "umi";
import { Pagination, Button } from "antd";
import Banner from "components/banner";
import style from  "./index.module.less";

const mapStateToProps = state =>{
  return{
    
  }
}

function TeachVideo(props){
  const [videoSelect, setVideoSelect] = useState("smallClass");
  const [TypeList, setTypeList] = useState(null);
  const [VideoListPage, setVideoListPage] = useState(1);
  const [videoList, setVideoList] = useState(null);
  const [pegeNum, setPageNum] = useState(12);

  // 获取视频
  useEffect(()=>{
    API.getTeachvideo().then(res=>{
      let DataList = { smallClass:[],openPlateForm:[] };
      res.list.map((item,index)=>{
        if(item.typeid === 60){
          DataList.smallClass.push(item)
        }else if( item.typeid === 68 ){
          DataList.openPlateForm.push(item)
        }
      })
      setVideoList(DataList)
    })
  },[])

    // 更新滚动高度header颜色改变
    useEffect(() => {
      let num = 0;
      if (props.BannerWidth < 760) {
        num = 160;
        setPageNum(6);
      } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
        num = 225;
        setPageNum(6);
      } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
        num = 225;
        setPageNum(8);
      } else {
        setPageNum(12);
      }
      props.dispatch({
        type: 'index/setHeaderScroll',
        data: num,
      });
    }, [props.BannerWidth]);

  // 获取banner图上的文字和图片
  useEffect(()=>{
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
                setVideoSelect("smallClass");
                setVideoListPage(1);
            }}> 纳博特小课堂 </li>
            <li className={ videoSelect === "openPlateForm"?  style.teachvideo_centre_h: style.teachvideo_centre } onClick={()=>{
                setVideoSelect("openPlateForm");
                setVideoListPage(1);
            }}> 开放平台教学视频 </li>
          </ul>
          <div className={style.teachvideo_centreFs}>
            <div className={style.teachvideo_centre}>
                { videoList=== null? "" : videoList[videoSelect].slice(
                  (VideoListPage - 1) * pegeNum,
                  (VideoListPage - 1) * pegeNum + pegeNum,
                  ).map((item,index)=>{
                    return(
                      <div key={index} className={style.teachvideo_centre_children}>
                        <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/20200601/%E5%B0%8F%E8%AF%BE%E5%A0%82-1.png" alt="" onClick={()=>{
                          location.href = item.link;
                        }} />
                        <p>{item.chap} &nbsp; &nbsp;{item.name}</p>
                      </div>
                    )
                }) }
            </div>
            <Pagination
              className={style.teachvideo_bottom_page}
              current={VideoListPage}
              itemRender={itemRender}
              pageSize={pegeNum}
              total={videoList === null ? 1 : videoList[videoSelect].length}
              onChange={(page, pageSize) => {
                setVideoListPage(page);
                console.log(videoList[videoSelect].length,pageSize)
                if (props.BannerWidth < 760) {
                  window.scrollTo(0, 105);
                } else if (props.BannerWidth > 1200) {
                  window.scrollTo(0, 361);
                } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
                  window.scrollTo(0, 160);
                } else if (
                  props.BannerWidth > 900 &&
                  props.BannerWidth < 1200
                ) {
                  window.scrollTo(0, 240);
                }
              }}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps)(TeachVideo);