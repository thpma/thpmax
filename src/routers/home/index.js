import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserTest } from "../../actions/user";
import Article from "../../components/article";
import { articleGetList } from "../../actions/article";
import { Spin, message } from "antd";

import "./index.less";

const Index = ({ user, article, articleGetList, location, history }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let page = parseInt(
      location.search
        .substr(1)
        .split("&")[0]
        .split("=")[1]
    );
    if (isNaN(page)) {
      page = 1;
    }
    if (page === article.page) {
      setLoading(false);
    } else {
      ChangePage(page);
    }
  }, [article.page]);

  function PreviousPage() {
    ChangePage(article.page - 1);
  }

  function NextPage() {
    ChangePage(article.page + 1);
  }

  function ChangePage(page) {
    page = page < 1 ? 1 : page;
    if (page > article.maxpage && article.maxpage > 0) {
      message.error("这已经是最后一页了!");
    } else if (page !== article.page) {
      setLoading(true);
      history.push(`/?page=${page}`);
      articleGetList(page);
    }
  }

  return (
    <div className="home-container">
      <div className="home-container-header">
        <div className="home-container-header-bg" />
        <input
          className="home-container-header-search"
          type="text"
          placeholder="搜索"
        />
      </div>
      <div className="home-container-content">
        <div className="home-container-content-left">
          {loading ? (
            <div className="home-container-content-loading">
              <Spin size="large" tip="正在加载中" />
            </div>
          ) : article.list.length === 0 ? (
            <div className="home-container-content-loading">没有文章咯</div>
          ) : (
            <React.Fragment>
              {article.list.map((v, k) => (
                <Article
                  key={k}
                  id={v.Id}
                  title={v.Title}
                  poster={v.Poster}
                  intro={v.Content}
                  author={v.Author}
                  date={v.CreatedAt}
                  views={v.Views}
                  comments={v.Comments}
                />
              ))}
              <div className="home-container-content-turnpage">
                <button onClick={PreviousPage}>上一页</button>
                <span>
                  {article.page}-{article.maxpage}
                </span>
                <button onClick={NextPage}>下一页</button>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="home-container-content-right">
          <div className="home-container-content-right-about">
            <div />
            <div>Dylan</div>
            <div>不喜欢 唱 跳 rap 篮球</div>
          </div>
          <div className="article-write">
            {user.logged ? (
              <Link className="article-write-item" to="/new">
                <svg
                  t="1568109836168"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2042"
                  width="20"
                  height="20"
                >
                  <path
                    d="M219.43296 804.57472l252.631639-93.109461-147.673213-151.403443L219.43296 804.57472z m701.283195-548.5632L773.116083 104.388651 351.526979 532.926223l147.600071 151.403443L920.716155 256.01152z m88.867238-163.32555L933.442821 14.351145c-19.601992-20.040842-53.100918-18.870574-74.38517 2.340536l-57.123714 58.367125 147.600071 151.403443 57.708849-58.293983c21.357394-21.21111 22.45452-55.441454 2.340536-75.482296z"
                    p-id="2043"
                  ></path>
                  <path
                    d="M853.352594 1024H97.505646A97.424824 97.424824 0 0 1 0.00768 926.575176V170.581944C0.00768 116.749609 43.600169 73.15712 97.505646 73.15712h456.624008v84.698158H97.505646a13.165517 13.165517 0 0 0-12.726666 12.726666V925.990042a13.165517 13.165517 0 0 0 12.726666 12.726666h755.846948a13.165517 13.165517 0 0 0 12.726666-12.726666V448.374349H950.85056v477.615693c0 53.832335-43.592489 98.009958-97.497966 98.009958z"
                    p-id="2044"
                  ></path>
                </svg>
                <span>写文章</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ user, article }) => ({
    user,
    article
  }),
  {
    UserTest,
    articleGetList
  }
)(Index);
