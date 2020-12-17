import React, { useState, useEffect } from 'react';
import './index.module.less';
import { RightCircleOutlined } from '@ant-design/icons';
import { useHistory } from "umi";

function serviceSupport(props) {
  const [contentList, setContentList] = useState(null);

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
    if (props.TypeList === null) {
      return;
    }
    for (let i = 0; i < props.TypeList.length; i++) {
      if (props.TypeList[i].id === 34) {
        setContentList(props.TypeList[i]);
      }
    }
  }, [props.TypeList]);

  return (
    <div
      className="ServiceSupport"
    >
      {contentList === null ? (
        ''
      ) : (
        <div className="serviceSupport">
          <div className="serviceSupport_top">
            <p> {contentList.typename} </p>
            <p> {contentList.typenameen} </p>
          </div>
          <p> {contentList.content.slice(0, 25)} </p>
          <div className="serviceSupport_content">
            {contentList.sublist.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    if( item.id === 65 ){
                      location.href = item.typedir
                    }else if(item.id === 64 ){
                      history.push("/service/faq")
                    }else{
                      history.push(getLink(item.typedir))
                    }
                  }}
                >
                  <p>{item.typename}</p>
                  <div>
                    <img
                      src={require(`images/icon_sp${index + 1}.png`)}
                      alt=""
                    />
                  </div>
                  <div>
                    <span className="serviceSupport_content_bx"></span>
                  </div>
                  <RightCircleOutlined className="serviceSupport_content_icon" />
                  <span className="serviceSupport_content_description">
                    {item.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default serviceSupport;
