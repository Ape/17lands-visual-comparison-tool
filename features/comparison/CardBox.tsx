import styled from 'styled-components';

interface CardBoxProps {
  card: Card;
  attributeLabel: string;
  attributeValue: string;
}

const CardBox: React.FC<CardBoxProps> = ({ card, attributeLabel, attributeValue }) => (
  <CardWrapper>
    <CardAttributes>
      <CardImage alt={card.name} title={card.name} src={card.url} />
      <CardName>
        {attributeLabel}
        <br />
        {attributeValue}
      </CardName>
    </CardAttributes>
  </CardWrapper>
);

export interface Card {
  id: number;
  name: string;
  set: {
    name: string;
  };
  url: string;
  attributeLabel: string;
  attributeValue: string;
}

const CardWrapper = styled.div({
  display: 'inline-block',
  fontSize: 'clamp(12px, 1.0vw, 22px)',
  height: 'auto',
  minHeight: '50px',
  lineHeight: 1.43,
});

const CardAttributes = styled.div({ textAlign: 'center', maxWidth: '100%' });

const CardName = styled.div({ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' });

const CardImage = styled.img({ width: '100%', height: 'auto', borderRadius: '5%' });

export default CardBox;
