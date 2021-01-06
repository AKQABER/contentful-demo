import TextBlock from '../components/TextBlock';
import HeadingBlock from '../components/HeadingBlock';
import ImageBlock from '../components/ImageBlock';

const renderComponent = component => {
  const contentType = component.sys.contentType.sys.id;

  if (contentType === 'textBlock') {
    return (
      <TextBlock
        key={component.fields.title}
        title={component.fields.title}
        content={component.fields.content.content[0].content[0].value}
      />
    );
  } else if (contentType === 'headingBlock') {
    return (
      <HeadingBlock
        key={component.fields.text}
        heading={component.fields.text}
      />
    );
  } else if (contentType === 'imageBlock') {
    return (
      <ImageBlock
        key={component.fields.image.fields.file.url}
        imageUrl={component.fields.image.fields.file.url}
        description={component.fields.caption}
      />
    );
  } else {
    return null;
  }
};

export default renderComponent;
