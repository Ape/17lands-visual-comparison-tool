import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import AutocompleteWithNegation, { AutocompleteOption } from '../components/AutocompleteWithNegation';
import CardBox from '../features/comparison/CardBox';
import cards, { Card } from '../features/comparison/data/afrCards';
// import getCardData from '../network/features/comparison/getCardData';

const HomePage: React.FC = () => {
  const [selectableCards, setSelectableCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedSortByOption, setSelectedSortByOption] = useState('win_rate');

  // TODO: Add support for live data if I can get access to an API from 17lands -- current API is restricted by CORS
  // const [cards, setCards] = useState([]);
  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const cards = await getCardData({
  //       expansion: 'AFR',
  //       format: 'PremierDraft',
  //       startDate: '2019-03-25',
  //       endDate: new Date().toISOString().slice(0, 10),
  //     });
  //     setCards(cards);
  //   };
  //   fetchCards();
  // }, []);

  useEffect(() => {
    setSelectableCards(mapCardsToAutocompleteOption(cards));
  }, [cards]);

  useEffect(() => {
    const sortedCards = [...selectedCards].sort(sortByCardAttribute);
    setSelectedCards(sortedCards);
  }, [selectedSortByOption]);

  const sortByCardAttribute = (a, b) => {
    const attribute = selectedSortByOption;
    if (a.data[attribute] > b.data[attribute]) {
      return -1;
    }
    if (a.data[attribute] < b.data[attribute]) {
      return 1;
    }
    return 0;
  };

  const updateSelectedCards = (newSelectedCards) => {
    const sortedCards = [...newSelectedCards.filter((card) => !card.exclude)].sort(sortByCardAttribute);
    setSelectedCards(sortedCards);
  };

  const handleSortByOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSortByOption = event.target.value as string;
    setSelectedSortByOption(newSortByOption);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" align="center">
        17 Lands Visual Comparison
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        <em>Because reading tables during a draft is too hard!</em>
      </Typography>
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={8} md={6}>
          <AutocompleteWithNegation
            options={selectableCards}
            selectedOptions={selectedCards}
            setSelectedOptionsLocally={updateSelectedCards}
            setSelectedOptionsRemotely={noOp}
            label=""
            placeholder="Search for and add multiple cards to compare!"
          />
        </Grid>
        <Grid item xs={4} md={12} style={{ textAlign: 'center' }}>
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select value={selectedSortByOption} onChange={handleSortByOptionChange}>
              {sortByOptions.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={10} spacing={2} alignItems="center" justifyContent="center">
          {selectedCards.map((selectedCard) => {
            const sortByOption = sortByOptions.find((option) => option.name === selectedSortByOption);
            return (
              <Grid item key={selectedCard.data.name} xs={2}>
                <CardBox
                  key={selectedCard.data.name}
                  card={selectedCard.data}
                  attributeLabel={sortByOption.label}
                  attributeValue={selectedCard.data[sortByOption.name]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

const mapCardsToAutocompleteOption = (cards: Array<Card>): Array<AutocompleteOption> =>
  cards.map((card) => ({
    category: 'Adventures in the Forgotten Realms',
    label: card.name,
    value: card.name,
    data: card,
    exclude: false,
  }));

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

const sortByOptions = [
  {
    name: 'win_rate',
    label: 'Win Rate In Main Deck',
  },
  {
    name: 'ever_drawn_win_rate',
    label: 'Win Rate If Ever Drawn',
  },
  {
    name: 'drawn_win_rate',
    label: 'Win Rate When Drawn',
  },
];
