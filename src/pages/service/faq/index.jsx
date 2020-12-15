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
      res.list.map((item, index) => {
        dataSoure.push({
          title: item.title,
          key: item.Id,
          value: item,
        });
      });
      setDataSoure(dataSoure);
      setDataColumns(columns);
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
        <Search onSearch={onSearch} enterButton  />
      </div>
      <div className="faq_selectAll">
        <div className="fa1_selectFs">
          <ul className="fa1_select">
            {faqSelectlist === null
              ? ''
              : faqSelectlist.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setFaqSelectNum(index);
                        setContentShow(true);
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
        </div>
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
                  setContentShow(false);
                  if (record.value.question1 != null && record.value.question1 != ''){
                    record.value.solution1 = record.value.solution1.replace(/[\n\r]/g, '<br>');
                  }
                  if (record.value.question2 != null && record.value.question2 != ''){
                    record.value.solution2 = record.value.solution2.replace(/[\n\r]/g, '<br>');
                  }
                  if (record.value.question3 != null && record.value.question3 != ''){
                    record.value.solution3 = record.value.solution3.replace(/[\n\r]/g, '<br>');
                  }
                  if (record.value.question4 != null && record.value.question4 != ''){
                    record.value.solution4 = record.value.solution4.replace(/[\n\r]/g, '<br>');
                  }
                  setContentValue(record.value);
                },
              };
            }}
          />
        </div>
        <div
          className="faq_contenAll"
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
          {contentValue === null? "" : 
            <div className="faq_content">
              <h2 className="faq_content_title"> {contentValue.title} </h2>
              <h3 className="faq_content_question1"> 问题一&nbsp;: &nbsp; <span> {contentValue.question1} </span> </h3>
              <div className="faq_content_solution1">
                <span > 解决方案一 &nbsp;:  &nbsp;</span>
                <div dangerouslySetInnerHTML={{ __html: contentValue.solution1 }} ></div>
              </div>
              <h3 className="faq_content_question1"> 问题二&nbsp;: &nbsp; <span>{contentValue.question2}</span> </h3>
              <div className="faq_content_solution1">
                <span > 解决方案二 &nbsp;:  &nbsp;</span>
                <div dangerouslySetInnerHTML={{ __html: contentValue.solution2 }} ></div>
              </div>
              <h3 className="faq_content_question1"> 问题三&nbsp;: &nbsp; <span>{contentValue.question3}</span> </h3>
              <div className="faq_content_solution1">
                <span > 解决方案三 &nbsp;:  &nbsp;</span>
                <div dangerouslySetInnerHTML={{ __html: contentValue.solution3 }} ></div>
              </div>
              <h3 className="faq_content_question1"> 问题四&nbsp;: &nbsp; <span>{contentValue.question4} </span></h3>
              <div className="faq_content_solution1">
                <span > 解决方案四 &nbsp;:  &nbsp;</span>
                <div dangerouslySetInnerHTML={{ __html: contentValue.solution4 }} ></div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Faq);
