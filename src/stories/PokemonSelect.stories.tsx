import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SelectPokemon from "../components/SelectPokemon";


export default {
  title: 'Components/SelectPokemon',
  component: SelectPokemon,
} as Meta;

interface Pokemon {
  name: string;
  sprite: string;
}

const Template: Story<{ selected: Pokemon[], setSelected: (p: Pokemon[]) => void }> = (args:any) => {
  const [selected, setSelected] = useState<Pokemon[]>(args.selected || []);
  return <SelectPokemon selected={selected} setSelected={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  selected: [],
};

export const WithSelectedPokemon = Template.bind({});
WithSelectedPokemon.args = {
  selected: [
    { name: 'bulbasaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'charmander', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  ],
};

export const OpenedDropdown = Template.bind({});
OpenedDropdown.args = {
  selected: [
    { name: 'bulbasaur', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  ],
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  selected: [],
};

export const MockedData = Template.bind({});
MockedData.args = {
  selected: [],
};
MockedData.decorators = [
  (Story:any) => {
    Story.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
              { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
            ],
          }),
      });

    return <Story />;
  },
];