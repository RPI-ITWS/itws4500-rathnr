import React from 'react';

function Section({ title, items }) {
  return (
    <div className="section">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className="item">
          {}
          {item.title && <div className="title">{item.title}</div>}
          {item.content && <div className="content">{item.content}</div>}
          {}
        </div>
      ))}
    </div>
  );
}

export default Section;
