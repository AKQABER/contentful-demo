import React from 'react';

const ImageBlock = ({ link, imageUrl, description }) =>
  link ? (
    <a href={link}>
      <img src={imageUrl} alt={description} />
      <p>{description}</p>
    </a>
  ) : (
    <>
      <img src={imageUrl} alt={description} />
      <p>{description}</p>
    </>
  );

export default ImageBlock;
