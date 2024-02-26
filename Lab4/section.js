import React from 'react';

function Section({ title, items }) {
  return (
    <div className="section">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className="item">
          {/* Display item content. You might need to adjust based on the item structure */}
          {item.title && <div className="title">{item.title}</div>}
          {item.content && <div className="content">{item.content}</div>}
          {/* Add more item properties as needed */}
        </div>
      ))}
    </div>
  );
}

export default Section;
