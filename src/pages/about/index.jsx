import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import Banner from 'components/banner/index';
import image from 'images/faq-bg.jpg';
import './index.module.less';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function About(props) {
  const [TypeList, setTypeList] = useState(null);
  const [aboutNum, setAboutNum] = useState(['inexbot', 0]);
  const [newCenter, setNewCenter] = useState(null);

  // 获取解决方案页面的全部数据
  useEffect(() => {
    if (props.TypeList === null) {
      return;
    }
    props.TypeList.map((item, index) => {
      if (item.id === 1) {
        setTypeList(item);
        // console.log(item,"这里是解决方案页面")
      }
    });
  }, [props.TypeList]);

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
    // console.log(TypeList);
    console.log(TypeList.sublist[aboutNum[1]]);
    setNewCenter(TypeList.sublist[aboutNum[1]].content);
    console.log(aboutNum);
  }, [aboutNum, TypeList]);

  return (
    <div>
      {TypeList === null ? (
        ''
      ) : (
        <div className="children_about">
          <Banner
            data={{
              BannerImg: image,
              BannerSize: '150%',
              BannerLeft: '40%',
              TxtCh: '解决方案',
              TxtEn: 'about',
            }}
          ></Banner>
          <div className="about_select_All">
            <ul className="about_select">
              {TypeList.sublist.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setAboutNum([item.typename, index]);
                    }}
                  >
                    <a
                      className={
                        index === aboutNum[1] ? 'hoveraboutTbs' : 'aboutTbs'
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
          <div className="multirobot">
            <div
              className={
                aboutNum[0] === 'MultiRobot'
                  ? 'multirobot_center'
                  : 'multirobot_center_l'
              }
              dangerouslySetInnerHTML={{ __html: newCenter }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(About);
