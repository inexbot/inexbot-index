import React, {useState, useEffect} from "react";
import {Pagination, Button} from "antd";
import { useHistory } from "umi";

function Index(props){
  
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
  return(
    <div className="product_content_probably"> 
      <div>
        { props.productData === null?"" :
          props.productData[[props.productNum[0]]].slice(
            (props.productPage - 1) * props.pegeNum,
            (props.productPage - 1) * props.pegeNum + props.pegeNum,
            ).map((item, index) => {
            return(
              <div key={index} className="product_content_children" onClick={ ()=>{
                props.showProductDetail(item);
                history.push({
                    pathname:"/product/content",
                    query: { id: Number(item.id),type: props.productNum[0],num:props.productNum[1]},
                  });
                props.Upmove()
                }}>
                <img src={item.litpic} alt="" />
                <p> { item.title } </p>
              </div>
            )
          })
        }
      </div>
      <Pagination
        className="product_bottom_page"
        current={props.productPage}
        itemRender={itemRender}
        pageSize={props.pegeNum}
        total={props.productData === null ? 1 : props.productData[props.productNum[0]].length}
        onChange={(page, pageSize) => {
          props.setProductPage(page);
        }}
      />
  </div>
  )
}

export default Index;