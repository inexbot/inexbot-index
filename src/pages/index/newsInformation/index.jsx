import React, { useState, useEffect } from 'react';
import style from './index.module.less';
import { useHistory } from 'umi';

function NewsInformation(props) {
  const [DataList, setDataList] = useState(null);
  const [newsSelect, setNewsSelect] = useState('Company');
  const [TypeList, setTypeList] = useState(null);

  const history = useHistory();
  useEffect(() => {
    let dataList = { Company: [], Industry: [] };
    if (props.inpormation !== null) {
      for (let i = 0; i < props.inpormation.list.length; i++) {
        if (props.inpormation.list[i].typeid === 8) {
          dataList.Company.push(props.inpormation.list[i]);
        } else if (props.inpormation.list[i].typeid === 9) {
          dataList.Industry.push(props.inpormation.list[i]);
        }
      }
      setDataList(dataList);
    }
  }, [props.inpormation]);

  useEffect(() => {
    if (props.TypeList !== null) {
      props.TypeList.map((item, index) => {
        if (item.id === 7) {
          setTypeList(item);
        }
      });
    }
  }, [props.TypeList]);

  return (
    <div className={style.NewsInformation_All}>
      <div className={style.NewsInformation}>
        <div className={style.NewsInformation_top}>
          <p> {TypeList === null ? '' : TypeList.typename} </p>
          <p> {TypeList === null ? '' : TypeList.typenameen} </p>
        </div>
        <div className={style.NewsInformation_select}>
          <ul>
            <li>
              <a
                className={
                  newsSelect === 'Company'
                    ? style.hoverNewsInformationTbs
                    : style.NewsInformationTbs
                }
                onClick={() => {
                  setNewsSelect('Company');
                }}
              >
                {' '}
                {TypeList === null ? '' : TypeList.sublist[0].typename}{' '}
                <span></span>
              </a>
            </li>
            <li>
              <a
                className={
                  newsSelect === 'Industry'
                    ? style.hoverNewsInformationTbs
                    : style.NewsInformationTbs
                }
                onClick={() => {
                  setNewsSelect('Industry');
                }}
              >
                {TypeList === null ? '' : TypeList.sublist[1].typename}{' '}
                <span></span>
              </a>
            </li>
          </ul>
        </div>
        <div className={style.NewsInformation_bottom}>
          <div className={style.NewsInformation_bottom_l}>
            {DataList === null ? (
              ''
            ) : (
              <div
                className={style.NewsInformation_content_l}
                key={0}
                onClick={() => {
                  window.scrollTo(0, 0);
                  history.push({
                    pathname: '/news/content',
                    query: {
                      id: Number(DataList[newsSelect][0].id),
                      type: newsSelect,
                    },
                  });
                }}
              >
                <img src={`${DataList[newsSelect][0].litpic}`} alt="" />
                <p> {DataList[newsSelect][0].title} </p>
                <span className={style.NewsInformation_content_txt1}>
                  {' '}
                  {DataList[newsSelect][0].description.slice(0, 49)}{' '}
                </span>
                <span
                  className={style.NewsInformation_content_txt2}
                  style={
                    props.BannerWidth > 1200
                      ? DataList[newsSelect][0].description.length > 49
                        ? { display: 'block' }
                        : { display: 'none' }
                      : { display: 'none' }
                  }
                >
                  {DataList[newsSelect][0].description.slice(49, 99)}
                </span>
                <span
                  className={style.NewsInformation_content_txt3}
                  style={
                    props.BannerWidth > 1200
                      ? DataList[newsSelect][0].description.length > 99
                        ? { display: 'block' }
                        : { display: 'none' }
                      : { display: 'none' }
                  }
                >
                  {DataList[newsSelect][0].description.slice(99)}
                </span>
                <span className={style.NewsInformation_content_date}>{`
                ${new Date(
                  DataList[newsSelect][0].pubdate * 1000,
                ).getFullYear()} -
                ${
                  new Date(DataList[newsSelect][0].pubdate * 1000).getMonth() +
                    1 <
                  10
                    ? '0' +
                      (new Date(
                        DataList[newsSelect][0].pubdate * 1000,
                      ).getMonth() +
                        1)
                    : new Date(
                        DataList[newsSelect][0].pubdate * 1000,
                      ).getMonth() + 1
                } -
                ${
                  new Date(DataList[newsSelect][0].pubdate * 1000).getDate() <
                  10
                    ? '0' +
                      new Date(DataList[newsSelect][0].pubdate * 1000).getDate()
                    : new Date(DataList[newsSelect][0].pubdate * 1000).getDate()
                }
                `}</span>
              </div>
            )}
          </div>
          <div className={style.NewsInformation_bottom_r}>
            <div>
              {DataList === null
                ? ''
                : DataList[newsSelect].slice(0, 6).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={style.NewsInformation_content_r}
                        style={
                          index === 0
                            ? { display: 'none' }
                            : index === 1
                            ? {}
                            : { marginTop: '10px' }
                        }
                        onClick={() => {
                          window.scrollTo(0, 0);
                          history.push({
                            pathname: '/news/content',
                            query: { id: Number(item.id), type: newsSelect },
                          });
                        }}
                      >
                        <img src={`${item.litpic}`} alt="" />
                        <div>
                          <p> {item.title} </p>
                          <span className={style.NewsInformation_content_txt1}>
                            {' '}
                            {item.id === 241
                              ? item.description.slice(0, 40)
                              : item.description.slice(0, 20)}{' '}
                          </span>
                          <span
                            className={style.NewsInformation_content_txt2}
                            style={
                              props.BannerWidth > 1200
                                ? item.id === 241
                                  ? item.description.length > 40
                                    ? { display: 'block' }
                                    : { display: 'none' }
                                  : item.description.length < 20
                                  ? { display: 'none' }
                                  : { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            {item.id === 241
                              ? item.description.slice(40)
                              : item.description.slice(20)}
                          </span>
                          <span
                            className={style.NewsInformation_content_date}
                          >{`
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
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsInformation;
