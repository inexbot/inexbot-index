import React, { useState, useEffect } from 'react';
import API from 'components/API/api';
import style from './index.module.less';
import { useHistory } from "umi";

function Solution(props) {
  const [dataList, setDataList] = useState([]);
  const [TypeList, sendTypeList] = useState(null);

  const history = useHistory();
  useEffect(() => {
    API.getSolutionType().then(res => {
      res.list.splice(2, 1);
      res.list.splice(6, 1);
      setDataList(res.list);
    });
  }, []);
  useEffect(() => {
    if (props.TypeList === null) {
      return;
    }
    for (let i = 0; i < props.TypeList.length; i++) {
      if (props.TypeList[i].id === 25) {
        sendTypeList(props.TypeList[i]);
      }
    }
  }, [props.TypeList]);
  function getLink(link) {
    let _cms = '{cmspath}';
    if (link.match(_cms)) {
      let _linkArray = link.split('}');
      return _linkArray[1];
    } else {
      return link;
    }
  }
  return (
    <div>
      <div
        className={style.solution}
      >
        <div className={style.solution_top}>
          <p> {TypeList === null ? '' : TypeList.typename} </p>
          <p> {TypeList === null ? '' : TypeList.typenameen}</p>
        </div>
        <p> 我们期待，未来每一台机器人的背后，都有纳博特的技术 </p>
        <div className={style.solution_btm}>
          {dataList.map((item, index) => {
            return (
              <div
                key={index}
                style={
                  props.BannerWidth > 1200
                    ? {
                        width: '33%',
                        height: '282px',
                        background: `url(${item.typeimg}) no-repeat`,
                        backgroundSize: '533px',
                      }
                    : {
                        background: `url(${item.typeimg}) no-repeat`,
                        backgroundSize: '136%',
                      }
                }
                onClick={() => {
                  window.scrollTo(0, 0);
                  if( item.sortrank <3 ){
                    history.push({
                      pathname:getLink(item.sitepath),
                      query: { type: item.typenameen, num: item.sortrank-1},
                    });
                  }else{
                    history.push({
                      pathname:getLink(item.sitepath),
                      query: { type: item.typenameen, num: item.sortrank-2},
                    });
                  }
                }}
              >
                <span className={style.solution_btm_txt}> {item.typename} </span>
                <div className={style.solution_btn_opc}>
                  <img src={require(`images/icon${index + 1}.png`)} alt="" />
                  <p> {item.description.slice(0, 21)}</p>
                  {item.description.length < 21 ? (
                    ''
                  ) : (
                    <span> {item.description.slice(21)} </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Solution;
