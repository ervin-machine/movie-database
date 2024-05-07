import { screen, queryByAttribute  } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import TMDBList from '.';
import React from 'react';

import { renderWithProviders } from '../../../utils/test-utils';



describe('TMDB List', () => {
  it('renders full tmdblist component', () => {
    
    renderWithProviders(<TMDBList />, {initialState: {}});

     const movieTabElement = screen.getByText("Movies");
     expect(movieTabElement).toBeInTheDocument();

     const tvShowsTabElement = screen.getByText("TV Shows");
     expect(tvShowsTabElement).toBeInTheDocument();

     const searchElement = screen.getByPlaceholderText("Search tv/movie ...");
     expect(searchElement).toBeInTheDocument();
  });

  it('Clicks movie tab and finds fetched movie', async () => {
    const getById = queryByAttribute.bind(null, 'id');
    const dom = renderWithProviders(<TMDBList />, {initialState: {}});

    const table = getById(dom.container, 'tab-1');
    userEvent.click(table)
    const fetchedMovie = await screen.findByText('The Godfather')
    expect(fetchedMovie).toBeInTheDocument();
  })

  it('Clicks tv shows tab and finds fetched tv', async () => {
    
    const getById = queryByAttribute.bind(null, 'id');
    const dom = renderWithProviders(<TMDBList />, {initialState: {}});

    const table = getById(dom.container, 'tab-0');
    userEvent.click(table)
    const fetchedTVShow = await screen.findByText('Arcane')
    expect(fetchedTVShow).toBeInTheDocument();
  })
})