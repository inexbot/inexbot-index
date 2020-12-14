import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import Banner from 'components/banner/index';
import image from 'images/faq-bg.jpg';
import './index.module.less';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Contact(props) {
  const [TypeList, setTypeList] = useState(null);
  const [newCenter, setNewCenter] = useState(null);
  const history = useHistory();
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
    setNewCenter(TypeList.sublist[1].content);
  }, [TypeList]);

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
              <li
                key={0}
                onClick={() => {
                  history.push('/about');
                }}
              >
                <a className="aboutTbs">
                  <p>公司简介</p>
                  <span></span>
                </a>
              </li>
              <li
                key={1}
                onClick={() => {
                  history.push('/about/contact');
                }}
              >
                <a className="hoveraboutTbs">
                  <p>联系我们</p>
                  <span></span>
                </a>
              </li>
              <li
                key={2}
                onClick={() => {
                  history.push('/about/join');
                }}
              >
                <a className="aboutTbs">
                  <p>加入我们</p>
                  <span></span>
                </a>
              </li>
              <li
                key={3}
                onClick={() => {
                  history.push('/about/partner');
                }}
              >
                <a className="aboutTbs">
                  <p>合作伙伴</p>
                  <span></span>
                </a>
              </li>
            </ul>
          </div>
          <div className="multirobot">
            <div
              className="multirobot_center_l"
              dangerouslySetInnerHTML={{ __html: newCenter }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Contact);
