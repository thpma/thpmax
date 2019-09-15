import React, { useEffect, useState } from "react";
import { categorys } from "../../utils";
import { Tag } from "antd";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/codeBlock";
import { getArticleDetails } from "../../api/request";

import "./index.less";

const Index = ({ history, match }) => {
  const [state, setState] = useState({
    Id: 0,
    Title: "正在获取文章详情...",
    Poster: "",
    Content: "",
    Category: []
  });

  useEffect(() => {
    let article_id = parseInt(match.params.id);
    if (isNaN(article_id)) {
      history.push("/404");
    } else {
      getArticleDetails({ id: article_id }).then(res => {
        if (!res.ok) {
          history.push("/404");
        } else {
          res.article.Category = res.article.Category.split(",").map(Number);
          setState({ ...res.article });
        }
      });
    }
  }, []);

  return (
    <div className="article-container">
      <div className="article-container-header">
        <div
          className="article-container-header-bg"
          style={{
            backgroundImage: state.Poster.length
              ? `url(http://localhost:8081/static/images/poster/${state.Poster})`
              : "none"
          }}
        />
        <input
          type="text"
          className="article-container-header-title"
          value={state.Title}
          disabled={true}
        />
      </div>
      <div className="home-container-content">
        <div className="home-container-content-left">
          {state.Id === 0 ? null : (
            <ReactMarkdown
              className="article-container-content"
              source={state.Content}
              renderers={{ code: CodeBlock }}
            />
          )}
        </div>
        <div className="home-container-content-right">
          <div className="article-container-content-toolbox">
            {state.Category.map((v, k) => (
              <Tag key={k} color={categorys[v].color}>
                {categorys[v].name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
