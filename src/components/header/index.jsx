import React, { useState, useEffect } from 'react';
import { connect } from "umi";
import style from './index.module.less';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { useHistory } from "umi";

const mapStateToProps = state =>{
  return{
    headerScroll: state.index.headerScroll
  }
}

function Header(props) {
  const [TypeList, setTypeList] = useState(props.TypeList);
  const [listShow, setListShow] = useState('none');
  const [headerBgc, setHeaderBgc] = useState('');
  const history = useHistory();
  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
  }
  useEffect(() => {
    if (props.TypeList !== null) {
      props.TypeList.splice(8);
    }
    setTypeList(props.TypeList);
  }, [props.TypeList]);

  useEffect(() => {
    window.addEventListener('scroll', function(e) {
      if (e.srcElement.documentElement.scrollTop + 60 > props.headerScroll) {
        setHeaderBgc('#1c3e5a');
      } else {
        setHeaderBgc('');
      }
    });
  }, [props.headerScroll]);

  // 点击一级导航跳转链接
  const firstNavClick = (Item) =>{
    window.scrollTo(0, 0);
    if( Item.id === 19 ){
      location.href = getLink(Item.typedir);
    }else if( Item.id === 34 ){
      history.push("download")
    }else if( Item.id === 1 ){
      history.push("about/inexbot")
    }else{
      history.push({
        pathname:getLink(Item.typedir),
        query: { type: "" },
      });
      
    }
  }

  // 点击二级导航跳转链接
  const secondNavClick = (Item) =>{
    window.scrollTo(0, 0);
    if( Item.id === 65 ){
      location.href = getLink(Item.typedir);
    }else if( Item.id === 8 ){
      history.push({
        pathname:getLink(Item.sitepath),
        query: { type: Item.typenameen.slice(0,7) },
      });
    }else if( Item.id === 9 ){
      history.push({
        pathname:getLink(Item.sitepath),
        query: { type: Item.typenameen.slice(0,8) },
      });
    }else{
      if( Item.reid === 25 ){
        if( Item.sortrank <3 ){
          history.push({
            pathname:getLink(Item.sitepath),
            query: { type: Item.typenameen, num: Item.sortrank-1},
          });
        }else{
          history.push({
            pathname:getLink(Item.sitepath),
            query: { type: Item.typenameen, num: Item.sortrank-2},
          });
        }
      }else if( Item.reid === 14 ){
        history.push({
          pathname:getLink(Item.sitepath),
          query: { type: Item.typenameen, num: Item.sortrank-1},
        });
      }else{
        history.push({
          pathname:getLink(Item.typedir),
          query: { type: Item.typenameen },
        });
      }
    }
  }

  return (
    <div 
      className={style.Header}
      style={
      { background: headerBgc, }  }>
      <div
        className={style.header}
      >
        <h1>
          <a href="https://www.inexbot.com">
            <img src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/logo.png"></img>
            <span>纳博特科技</span>
          </a>
        </h1>
        <ul className={style.header_list}>
          {TypeList === null
            ? ' '
            : TypeList.map((Item, Index) => {
                return (
                  <li key={Index}>
                    <a  onClick={firstNavClick.bind(null,Item)}>
                      {Item.typename} <span></span>
                    </a>
                    <ul>
                      {Item.sublist.map((item, index) => {
                        return (
                          <li key={index}>
                            <a  onClick={secondNavClick.bind(null,item)}>
                              {' '}
                              {item.typename}
                              <span></span>{' '}
                            </a>{' '}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
        </ul>
        <div className={style.header_txt}>
          <a className={style.header_text_cn}> 中文 </a>
          <span>&nbsp; / &nbsp;</span>
          <a
            className={style.header_text_en}
            href="http://en.inexbot.com/#Banner"
          >
            {' '}
            EN{' '}
          </a>
        </div>
        {/* <div className={style.top_sousuo}>
          <a>
            <SearchOutlined />
          </a>
          <input className={style.icon_sousuo_ipt} />
          <span></span>
        </div> */}
        <div className={style.icon_list}>
          <MenuOutlined
            onClick={() => {
              if (listShow === 'none') {
                setListShow('flex');
              } else {
                setListShow('none');
              }
            }}
          />
        </div>
      </div>
      <ul
        className={style.header_list_P}
        style={{ height: `100vh`, display: listShow }}
      >
        {TypeList === null
          ? ' '
          : TypeList.map((Item, Index) => {
              return (
                <li key={Index}>
                  <a onClick={firstNavClick.bind(null,Item)} >{Item.typename}</a>
                  <ul>
                    {Item.sublist.map((item, index) => {
                      return (
                        <li key={index}>
                          <a onClick={secondNavClick.bind(null,item)}>
                            <span>-{item.typename}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default connect(mapStateToProps)(Header);
