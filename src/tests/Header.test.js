import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithProvider from './helper/renderWithProvider';

describe('Testa o Header', () => {
  test('Testa se os componentes do header estão sendo renderizados', () => {
    act(() => {
      renderWithProvider(<App />, '/meals');
    });

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    const renderElements = [profileIcon, searchIcon, pageTitle];

    renderElements.forEach((e) => expect(e).toBeInTheDocument());

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(searchInput).not.toBeInTheDocument();
  });
  it('Verifica se o botão "Profile" reireciona para a pagina correta.', () => {
    act(() => {
      renderWithProvider(<App />, '/meals');
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
  });
});
