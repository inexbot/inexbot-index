import React, { useState, useEffect } from 'react';
import style from './index.module.less';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

function Header(props) {
  const [TypeList, setTypeList] = useState(props.TypeList);
  const [listShow, setListShow] = useState('none');
  const [headerBgc, setHeaderBgc] = useState('');

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
      if (e.srcElement.documentElement.scrollTop + 60 > props.BannerHeight) {
        setHeaderBgc('#1c3e5a');
      } else {
        setHeaderBgc('');
      }
    });
  }, [props.BannerHeight]);

  return (
    <div>
      <div
        className={style.header}
        style={
          props.BannerWidth > 1200
            ? {
                width: props.BannerWidth,
                padding: `0 ${(props.BannerWidth - 1200) / 2.6}px`,
                background: headerBgc,
              }
            : { background: headerBgc }
        }
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
                    <a href={getLink(Item.sitepath)}>
                      {Item.typename} <span></span>
                    </a>
                    <ul>
                      {Item.sublist.map((item, index) => {
                        return (
                          <li key={index}>
                            <a href={getLink(item.typedir)}>
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
        <div className={style.top_sousuo}>
          <a>
            <SearchOutlined />
          </a>
          <input className={style.icon_sousuo_ipt} />
          <span></span>
        </div>
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
        style={{ height: `${props.BannerHeight}px`, display: listShow }}
      >
        {TypeList === null
          ? ' '
          : TypeList.map((Item, Index) => {
              return (
                <li key={Index}>
                  <a href={getLink(Item.sitepath)}>{Item.typename}</a>
                  <ul>
                    {Item.sublist.map((item, index) => {
                      return (
                        <li key={index}>
                          <a href={getLink(item.typedir)}>
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

export default Header;
