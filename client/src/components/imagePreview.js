import styled from 'styled-components/macro';

export default function ImagePreview({ market, imageWidth, setDetailImage }) {
  return (
    <ImageWrapper>
      {market.images.map((image, index) => (
        <Img
          onClick={() => setDetailImage(false)}
          width={imageWidth}
          key={index + image}
          src={image}
        />
      ))}
    </ImageWrapper>
  );
}

const ImageWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  padding: 0.5rem;
`;

const Img = styled.img`
  cursor: pointer;
  padding: 0.4rem;
`;
