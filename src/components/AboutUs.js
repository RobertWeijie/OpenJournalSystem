import React from 'react';
import './AboutUs.css';

function AboutUs() {
  // 关于我们数据
  const aboutInfo = {
    mission: [
      "推动学术创新与发展",
      "促进学术交流与合作",
      "提供高质量的学术服务",
      "培养优秀的学术人才"
    ],
    
    achievements: [
      {
        year: "2023",
        content: "荣获中国科技期刊卓越行动计划支持期刊"
      },
      {
        year: "2022",
        content: "入选中国科技核心期刊"
      },
      {
        year: "2021",
        content: "获评优秀科技期刊"
      }
    ],
    
    team: [
      {
        role: "主编",
        description: "由多位院士领衔的专家团队"
      },
      {
        role: "编委会",
        description: "来自全球知名高校和研究机构的专家学者"
      },
      {
        role: "编辑部",
        description: "专业的学术编辑和技术团队"
      }
    ]
  };

  return (
    <div className="about-section">
      <h2>关于我们</h2>
      <div className="about-content">
        <div className="about-card mission-card">
          <h3>我们的使命</h3>
          <ul className="mission-list">
            {aboutInfo.mission.map((item, index) => (
              <li key={index} className="mission-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-card achievements-card">
          <h3>发展历程</h3>
          <div className="timeline">
            {aboutInfo.achievements.map((achievement, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{achievement.year}</div>
                <div className="timeline-content">{achievement.content}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-card team-card">
          <h3>团队介绍</h3>
          <div className="team-grid">
            {aboutInfo.team.map((member, index) => (
              <div key={index} className="team-item">
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 