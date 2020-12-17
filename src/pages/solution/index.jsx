import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import {Button} from "antd";
import API from "components/API/api.js";
import Banner from 'components/banner/index';
import image from 'images/faq-bg.jpg';
import './index.module.less';

const mapStateToProps = state => {
  return {};
};

function Solution(props) {
  const [TypeList, setTypeList] = useState(null);
  const [solutionNum, setSolutionNum] = useState(['Pallet', 0]);
  const [newCenter, setNewCenter] = useState(null);
  const [multirobotPhoto, setMultirobotPhoto] = useState(null);
  const [videoList, setVideoList] = useState(null);
  const [pitchOnVideo, setPitchOnVideo] = useState(null);
  const [videoShow, setVideoShow] = useState(false);

  // 获取解决方案页面的全部数据
  useEffect(() => {
    if (props.TypeList === null) {
      return;
    }
    props.TypeList.map((item, index) => {
      if (item.id === 25) {
        setTypeList(item);
      }
    });
  }, [props.TypeList]);

  useEffect(()=>{
    if( props.location.query.type === null || props.location.query.type === undefined ){
      setSolutionNum(['Pallet', 0]);
    }else{
      if( props.location.query.type === "" ){
        setSolutionNum(['Pallet', 0]);
        return;
      }
      setSolutionNum([props.location.query.type,props.location.query.num])
    }
  },[props.location.query])


  // 更新滚动高度header颜色改变
  useEffect(() => {
    let num = 0;
    if (props.BannerWidth < 760) {
      num = 200;
    } else if (props.BannerWidth > 760 && props.BannerWidth < 1200) {
      num = 280;
    } else {
      num = 500;
    }
    props.dispatch({
      type: 'index/setHeaderScroll',
      data: num,
    });
  }, [props.BannerWidth]);

  // 根据选择不同的模块显示不同的中心内容
  useEffect(() => {
    if (TypeList === null) {
      return;
    }
    TypeList.sublist.map((item, index) => {
      if (item.typenameen === solutionNum[0]) {
        setNewCenter(item.content);
      }
    });
  }, [solutionNum, TypeList]);

  // 获取多机协作模块的两张照片
  useEffect(() => {
    if (props.productList === null) {
      return;
    }
    let DataList = [];
    props.productList.list.map((item, index) => {
      if (item.id === 135 || item.id === 136) {
        DataList.push(item);
      }
    });
    setMultirobotPhoto(DataList);
  }, [props.productList]);

  // 获取视频
  useEffect(()=>{
    API.getSolutionVideo().then(res=>{
      setVideoList(res.list);
    })
  },[])

  // 点击图片视频显示
  const clickVideoShow = (Item) =>{
    setVideoShow(true);
    let data = { video:null, txt:"" };
    videoList.map((item,index)=>{
      if( Item.id === item.aid ){
        data.video = item;
        data.txt =  Item.description;
        setPitchOnVideo(data)
      }
    })
  }
  return (
    <div>
      {TypeList === null ? (
        ''
      ) : (
        <div className="children_solution">
          <Banner
            data={{
              BannerImg: image,
              BannerSize: '150%',
              BannerLeft: '40%',
              TxtCh: '解决方案',
              TxtEn: 'SOLUTION',
            }}
          ></Banner>
          <div className="solution_select_All">
            <ul className="solution_select">
              {TypeList.sublist.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setSolutionNum([item.typenameen, index]);
                      setVideoShow(false);
                      if(videoShow){
                        let video = document.getElementsByTagName('video');
                        video[0].pause()
                      }
                    }}
                  >
                    <a
                      className={
                        index === solutionNum[1]
                          ? 'hoversolutionTbs'
                          : 'solutionTbs'
                      }
                    >
                      <p>{item.typename}</p>
                      <span></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="multirobot" style={ videoShow ?{display:"none"}:{display:"block"}}>
            <div
              className={
                solutionNum[0] === 'MultiRobot'
                  ? 'multirobot_center'
                  : 'multirobot_center_l'
              }
              dangerouslySetInnerHTML={
                newCenter === null
                  ? { __html: '<div> </div>' }
                  : { __html: newCenter }
              }
            ></div>
            <div className="multirobot_photo">
              {multirobotPhoto === null
                ? ''
                : multirobotPhoto.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={
                          solutionNum[0] === 'MultiRobot'
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                        onClick={clickVideoShow.bind(null,item)}
                      >
                        <img src={item.litpic} alt="" />
                        <p>{item.title}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="solution_video" style={ videoShow ?{display:"block"}:{display:"none"}}>
            <Button onClick={()=>{
              setVideoShow(false);
              let video = document.getElementsByTagName('video');
              video[0].pause()
            }}> 返回 </Button>
            <p > {pitchOnVideo === null?"": pitchOnVideo.txt} </p>
            <div  id="movie" 
              dangerouslySetInnerHTML = {pitchOnVideo === null?{ __html: '<div> </div>' }: { __html:pitchOnVideo.video.body}}>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Solution);
