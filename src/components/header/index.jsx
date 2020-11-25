import React, { useState, useEffect } from 'react';
import style from './index.module.less';
import { SearchOutlined } from '@ant-design/icons';

function Header(props) {
  const [TypeList, setTypeList] = useState(props.TypeList);
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
  return (
    <div
      className={style.header}
      style={{
        width: props.BannerWidth,
        padding: `0 ${(props.BannerWidth - 1280) / 2.6}px`,
      }}
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
        <a style={{ fontSize: '15px', color: 'white' }}> 中文 </a>
        <span>&nbsp; / &nbsp;</span>
        <a style={{ fontSize: '14px', color: '#a5b3be' }}> EN </a>
      </div>
      <div className={style.top_sousuo} style={{ position: 'relative' }}>
        <a className={style.icon_sousuo}>
          <SearchOutlined />
        </a>
        <input className={style.icon_sousuo_ipt} />
        <span></span>
      </div>
    </div>
  );
}

export default Header;
