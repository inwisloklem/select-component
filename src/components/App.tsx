import * as React from 'react';
import styled from 'styled-components';

import Game from '../enums/Game';
import Select from './Select';
import { DURATION, colorBlack400, colorBlack600 } from '../constants';

const DummyIcon = styled.button`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background-color: ${colorBlack400};
  transition: background-color ${DURATION}ms ease;
  cursor: pointer;
`;

const DummyTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  cursor: pointer;
`;

const DummyPage = styled.div`
  padding: 90vh 0;
`;

const DummyLine = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${DummyIcon} {
      background-color: ${colorBlack600};
    }
  }
`;

const options = [
  { label: 'Для вас', value: Game.ForYou },
  { label: 'Популярные', value: Game.Popular },
  { label: 'Новые', value: Game.New },
  { label: 'Играют сейчас', value: Game.PlayingNow },
  { label: 'Настольные', value: Game.Board },
  { label: 'Аркады', value: Game.Arcade },
  { label: 'Приключения', value: Game.Adventure },
  { label: 'Азартные', value: Game.Gamble },
];

const customModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 16],
    },
  },
];

const App: React.FC = () => (
  <DummyPage>
    <Select options={options} modifiers={customModifiers} onOptionClick={console.info}>
      <DummyLine>
        <DummyIcon />
        <DummyTitle>Игры для вас</DummyTitle>
      </DummyLine>
    </Select>
  </DummyPage>
);

export default App;
