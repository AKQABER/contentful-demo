import React from 'react';

const TextBlock = ({ title, content }) => (
  <>
    {title && <h2>{title}</h2>}
    {content && <p>{content}</p>}
  </>
);

export default TextBlock;
