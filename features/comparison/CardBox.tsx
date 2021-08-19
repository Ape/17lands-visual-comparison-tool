import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

interface CardBoxProps {
  card: Card;
  attributeLabel: string;
  attributeValue: string;
  loading: boolean;
}

const CardBox: React.FC<CardBoxProps> = ({ card, attributeLabel, attributeValue, loading }) => {
  const shouldntUsePercentage = attributeLabel !== 'Average Pick Seen At' && attributeLabel !== 'Average Pick Taken At';
  const style = shouldntUsePercentage ? 'percent' : 'decimal';

  const attributeValueFormatted = !Number.isNaN(attributeValue)
    ? Number(attributeValue).toLocaleString(undefined, {
        style,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 'N/A';

  return (
    <CardWrapper>
      <CardAttributes>
        <CardImage alt={card.name} title={card.name} src={card.url} />
        <CardName>
          {attributeLabel}
          <br />
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Skeleton animation="wave" width="50px" style={{ display: 'inline-block' }} />
            </div>
          ) : (
            attributeValueFormatted
          )}
        </CardName>
      </CardAttributes>
    </CardWrapper>
  );
};

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
