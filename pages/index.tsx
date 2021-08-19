import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AutocompleteWithNegation, { AutocompleteOption } from '../components/AutocompleteWithNegation';
import CardBox, { Card } from '../features/comparison/CardBox';
import { getFiltersProxy } from '../network/features/comparison/getFiltersProxy';
import { getCardDataProxy } from '../network/features/comparison/getCardDataProxy';

const HomePage: React.FC = () => {
  const [selectableCards, setSelectableCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedSortByOption, setSelectedSortByOption] = useState('ever_drawn_win_rate');

  const [selectedExpansion, setSelectedExpansion] = useState('AFR');
  const [selectedFormat, setSelectedFormat] = useState('PremierDraft');

  const today = new Date();
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(today.getMonth() - 4);
  const defaultStartDate = fourMonthsAgo.toISOString().slice(0, 10);
  const defaultEndDate = today.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [filters, setFilters] = useState({
    colors: [],
    expansions: [
      'AFR',
      'STX',
      'KHM',
      'ZNR',
      'KLR',
      'M21',
      'AKR',
      'IKO',
      'THB',
      'ELD',
      'M20',
      'WAR',
      'RNA',
      'GRN',
      'M19',
      'DOM',
      'RIX',
      'XLN',
      'MH2',
      'MH1',
      '2XM',
      'TSR',
      'Ravnica',
      'CORE',
      'Cube',
    ],
    formats: [
      'PremierDraft',
      'TradDraft',
      'QuickDraft',
      'CompDraft',
      'Sealed',
      'TradSealed',
      'CubeDraft',
      'CubeSealed',
      'DraftChallenge',
      'OpenSealed_D1_Bo1',
      'OpenSealed_D1_Bo3',
      'OpenSealed_D2_Bo3',
    ],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      const fetchedFilters = await getFiltersProxy();
      setFilters(fetchedFilters);
      setSelectedExpansion(fetchedFilters?.expansions?.[0]);
    };
    fetchFilters();
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCardDataProxy({
        expansion: selectedExpansion,
        format: selectedFormat,
        startDate,
        endDate,
      });
      setCards(fetchedCards);
    };
    fetchCards();
  }, [selectedExpansion, selectedFormat, startDate, endDate]);

  useEffect(() => {
    setSelectableCards(mapCardsToAutocompleteOption(cards));
  }, [cards]);

  useEffect(() => {
    const sortedCards = [...selectedCards].sort(sortByCardAttribute);
    setSelectedCards(sortedCards);
  }, [selectedSortByOption]);

  const sortByCardAttribute = (a, b) => {
    const attribute = selectedSortByOption;
    const sortDirection = attribute === 'avg_seen' || attribute === 'avg_pick' ? -1 : 1;
    if (a.data[attribute] > b.data[attribute]) {
      return -sortDirection;
    }
    if (a.data[attribute] < b.data[attribute]) {
      return sortDirection;
    }
    return 0;
  };

  const mapCardsToAutocompleteOption = (cardsToMap: Array<Card>): Array<AutocompleteOption> =>
    cardsToMap.map((card) => ({
      category: selectedExpansion,
      label: card.name,
      value: card.name,
      data: card,
      exclude: false,
    }));

  const updateSelectedCards = (newSelectedCards) => {
    const sortedCards = [...newSelectedCards.filter((card) => !card.exclude)].sort(sortByCardAttribute);
    setSelectedCards(sortedCards);
  };

  const handleSortByOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSortByOption = event.target.value as string;
    setSelectedSortByOption(newSortByOption);
  };

  const handleSelectedExpansionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedExpansion = event.target.value as string;
    setSelectedExpansion(newSelectedExpansion);
    setSelectedCards([]);
  };

  const handleSelectedFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedFormat = event.target.value as string;
    setSelectedFormat(newSelectedFormat);
    setSelectedCards([]);
  };

  const handleStartDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newStartDate = event.target.value as string;
    setStartDate(newStartDate);
    setSelectedCards([]);
  };

  const handleEndDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newEndDate = event.target.value as string;
    setEndDate(newEndDate);
    setSelectedCards([]);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" align="center">
        17Lands Visual Comparison
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        <em>Because reading tables during a draft is hard! :) Data updates every 24 hours.</em>
      </Typography>
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <AutocompleteWithNegation
            options={selectableCards}
            selectedOptions={selectedCards}
            setSelectedOptionsLocally={updateSelectedCards}
            setSelectedOptionsRemotely={noOp}
            label=""
            placeholder="Search for and add multiple cards to compare!"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item>
          <FormControl>
            <InputLabel>Expansion</InputLabel>
            <Select value={selectedExpansion} onChange={handleSelectedExpansionChange}>
              {filters?.expansions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Format</InputLabel>
            <Select value={selectedFormat} onChange={handleSelectedFormatChange}>
              {filters?.formats.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
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
        <Grid item>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid container item xs={10} spacing={2} alignItems="center" justifyContent="center">
          {selectedCards.map((selectedCard) => {
            const sortByOption = sortByOptions.find((option) => option.name === selectedSortByOption);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={selectedCard.data.name}>
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

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

const sortByOptions = [
  {
    name: 'ever_drawn_win_rate',
    label: 'Win Rate In Hand (Opener or Drawn)',
  },
  {
    name: 'opening_hand_win_rate',
    label: 'Win Rate In Opening Hand',
  },
  {
    name: 'drawn_win_rate',
    label: 'Win Rate When Drawn (Turn 1+)',
  },
  {
    name: 'win_rate',
    label: 'Win Rate In Main Deck',
  },
  {
    name: 'never_drawn_win_rate',
    label: 'Win Rate If Never Drawn',
  },
  {
    name: 'drawn_improvement_win_rate',
    label: 'Win Rate Improvement When Drawn',
  },
  {
    name: 'avg_seen',
    label: 'Average Pick Seen At',
  },
  {
    name: 'avg_pick',
    label: 'Average Pick Taken At',
  },
];
