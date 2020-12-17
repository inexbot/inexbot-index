import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { Pagination, Button } from 'antd';

function Index(props) {
  const history = useHistory();
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


  return (
    <div className="newlist">
      {props.productList === null
        ? ''
        : props.productList[props.newSelect]
            .slice(
              (props.newListPage - 1) * props.pegeNum,
              (props.newListPage - 1) * props.pegeNum + props.pegeNum,
            )
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="newlist_center"
                  onClick={() => {
                    props.ChangeNewsContent(item);
                    history.push({
                      pathname: '/news/content',
                      query: { id: Number(item.id), type: props.newSelect },
                    });
                  }}
                >
                  <div className="newlist_center_img">
                    <img src={item.litpic} alt="" />
                  </div>
                  <p className="newlist_center_title"> {item.title} </p>
                  <p className="newlist_center_dis"> {item.description} </p>
                  <span className="newlist_center_date">{`
                    ${new Date(item.pubdate * 1000).getFullYear()} -
                    ${
                      new Date(item.pubdate * 1000).getMonth() + 1 < 10
                        ? '0' + (new Date(item.pubdate * 1000).getMonth() + 1)
                        : new Date(item.pubdate * 1000).getMonth() + 1
                    } -
                    ${
                      new Date(item.pubdate * 1000).getDate() < 10
                        ? '0' + new Date(item.pubdate * 1000).getDate()
                        : new Date(item.pubdate * 1000).getDate()
                    }
                    `}</span>
                  </div>
                );
            })}
      <Pagination
        className="newlist_bottom_page"
        current={props.newListPage}
        itemRender={itemRender}
        pageSize={props.pegeNum}
        total={
          props.productList === null
            ? 1
            : props.productList[props.newSelect].length
        }
        onChange={(page, pageSize) => {
          props.setnewListPage(page);
          if (props.BannerWidth < 760) {
            window.scrollTo(0, 160);
          } else if (props.BannerWidth > 1200) {
            window.scrollTo(0, 361);
          } else if (props.BannerWidth > 760 && props.BannerWidth < 900) {
            window.scrollTo(0, 240);
          } else if (props.BannerWidth > 900 && props.BannerWidth < 1200) {
            window.scrollTo(0, 240);
          }
        }}
      />
    </div>
  );
}

export default Index;
