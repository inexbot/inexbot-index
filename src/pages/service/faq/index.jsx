import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import API from 'components/API/api.js';
import { Input, Table } from 'antd';
import './index.module.less';
import Banner from 'components/banner/index.jsx';
import banner1 from 'images/faq-bg.jpg';

const mapStateToProps = state => {
  return {
    headerScroll: state.index.headerScroll,
  };
};

function Faq(props) {
  const [faqSelectlist, setFaqSelectlist] = useState(null);
  const [faqSelectNum, setFaqSelectNum] = useState(0);
  const [dataColumns, setDataColumns] = useState(null);
  const [dataSoure, setDataSoure] = useState(null);
  const [contentShow, setContentShow] = useState(true);
  const [contentValue, setContentValue] = useState(null);
  const [dataList, setDataList] = useState(null);
  // const []
  //
  // useEffect(() => {
  //   props.dispatch({
  //     type: 'index/setHeaderScroll',
  //     data: 500,
  //   });
  // }, []);

  const { Search } = Input;
  const onSearch = value => console.log(value);

  // 获取列表
  useEffect(() => {
    API.getFaqSelect().then(res => {
      setFaqSelectlist(res.list);
    });
  }, []);

  // 获取标题表格
  useEffect(() => {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
    ];
    API.getFaqtitle(faqSelectNum + 1).then(res => {
      let dataSoure = [];
      console.log(res);
      res.list.map((item, index) => {
        dataSoure.push({
          title: item.title,
          key: item.Id,
          value: item,
        });
      });
      setDataSoure(dataSoure);
      setDataColumns(columns);
      setDataList(res.list);
    });
  }, [faqSelectNum]);

  return (
    <div className="children_faq">
      <Banner
        data={{
          BannerImg: banner1,
          TxtCh: '常见问题',
          TxtEn: 'FREQUENTLY  ASKED QUESTIONS',
          Height: 500,
          BannerSize: '150%',
          BannerLeft: '40%',
        }}
      ></Banner>
      <div className="faq_search">
        <Search onSearch={onSearch} enterButton style={{ height: '200px' }} />
      </div>
      <div className="faq_selectAll">
        <ul className="fa1_select">
          {faqSelectlist === null
            ? ''
            : faqSelectlist.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setFaqSelectNum(index);
                      console.log(item);
                    }}
                  >
                    <a
                      className={
                        index === faqSelectNum
                          ? 'hoversolutionTbs'
                          : 'solutionTbs'
                      }
                    >
                      <p>{item.type}</p>
                      <span></span>
                    </a>
                  </li>
                );
              })}
        </ul>
        <div
          className="faq_table"
          style={contentShow ? { display: 'block' } : { display: 'none' }}
        >
          <Table
            columns={dataColumns}
            dataSource={dataSoure}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  // history.push(`/content?id=${record.key}`);
                  console.log(record);
                  dataList.map((item, index) => {
                    // console.log(item)
                    if (item.id === record.key) {
                      setContentValue(item);
                      console.log(item);
                    }
                  });
                },
              };
            }}
          />
        </div>
        <div
          className="fa1_content"
          style={contentShow ? { display: 'none' } : { display: 'block' }}
        >
          <img
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/open/index/img/back.png"
            width="40px"
            style={{ marginRight: '10px' }}
            onClick={() => {
              setContentShow(true);
            }}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Faq);
