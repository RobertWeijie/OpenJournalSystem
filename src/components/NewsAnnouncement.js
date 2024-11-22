import React, { useState } from 'react';
import './NewsAnnouncement.css';

function NewsAnnouncement() {
  const [selectedNews, setSelectedNews] = useState(null);

  // 新闻数据
  const newsData = [
    {
      id: 1,
      title: '关于2024年度期刊优秀论文评选的通知',
      date: '2024-03-20',
      content: '为提高期刊学术水平，激励作者投稿积极性，现开展2024年度优秀论文评选活动...',
      fullContent: `为提高期刊学术水平，激励作者投稿积极性，现开展2024年度优秀论文评选活动。

评选范围：
1. 2024年1月1日至12月31日发表的所有论文
2. 具有创新性和学术价值的研究论文
3. 具有重要应用价值的技术报告

评选标准：
1. 选题具有创新性和重要性
2. 研究方法科学规范
3. 研究结果具有重要理论或实践意义
4. 论文撰写规范，表达清晰

奖励方式：
1. 一等奖1名，奖金10000元
2. 二等奖2名，奖金5000元
3. 三等奖3名，奖金3000元

申报方式：
请作者登录期刊网站，在"优秀论文评选"栏目提交申请...`,
      author: '期刊编辑部',
      category: '通知公告'
    },
    {
      id: 2,
      title: '期刊系统升级维护通知',
      date: '2024-03-15',
      content: '为提供更好的服务，本刊系统将于2024年3月20日进行升级维护...',
      fullContent: `为提供更好的服务，本刊系统将于2024年3月20日进行升级维护。

维护时间：2024年3月20日 00:00-06:00
影响范围：
1. 在线投稿系统
2. 审稿系统
3. 用户中心

维护期间暂停服务，给您带来的不便敬请谅解。

特别提醒：
1. 请作者提前保存未提交的稿件
2. 请审稿专家提前保存审稿意见
3. 系统恢复后可能需要重新登录

如有疑问，请联系技术支持：support@example.com`,
      author: '技术部',
      category: '系统通知'
    },
    {
      id: 3,
      title: '2024年度审稿专家招募公告',
      date: '2024-03-10',
      content: '为进一步提高期刊审稿质量，现面向全国高校和科研院所招募审稿专家...',
      fullContent: `为进一步提高期刊审稿质量，现面向全国高校和科研院所招募审稿专家。

招募条件：
1. 具有副高级以上职称
2. 在本领域具有较高的学术造诣
3. 熟悉学术期刊审稿工作
4. 能够按时完成审稿任务

专业方向：
1. 计算机科学与技术
2. 人工智能
3. 软件工程
4. 网络安全

申请方式：
请将个人简历发送至expert@example.com`,
      author: '期刊编辑部',
      category: '招募通知'
    }
  ];

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  return (
    <div className="news-container">
      {selectedNews ? (
        <div className="news-detail">
          <button className="back-button" onClick={handleBack}>
            返回列表
          </button>
          <article className="news-detail-content">
            <header>
              <h2>{selectedNews.title}</h2>
              <div className="news-meta">
                <span className="news-category">{selectedNews.category}</span>
                <span className="news-date">{selectedNews.date}</span>
                <span className="news-author">发布人：{selectedNews.author}</span>
              </div>
            </header>
            <div className="news-body">
              {selectedNews.fullContent.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      ) : (
        <>
          <h2>新闻公告</h2>
          <div className="news-list">
            {newsData.map(news => (
              <div 
                key={news.id} 
                className="news-item"
                onClick={() => handleNewsClick(news)}
              >
                <h3>{news.title}</h3>
                <div className="news-info">
                  <span className="news-category">{news.category}</span>
                  <span className="news-date">{news.date}</span>
                </div>
                <p className="news-summary">{news.content}</p>
                <div className="news-more">
                  点击查看详情
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NewsAnnouncement; 