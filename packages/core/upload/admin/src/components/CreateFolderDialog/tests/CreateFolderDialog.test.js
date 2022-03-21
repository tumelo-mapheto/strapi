import React from 'react';
import { ThemeProvider, lightTheme } from '@strapi/design-system';
import { IntlProvider } from 'react-intl';
import { render, fireEvent } from '@testing-library/react';

import { CreateFolderDialog } from '../CreateFolderDialog';

function ComponentFixture(props) {
  return (
    <IntlProvider locale="en" messages={{}}>
      <ThemeProvider theme={lightTheme}>
        <CreateFolderDialog {...props} />
      </ThemeProvider>
    </IntlProvider>
  );
}

function setup(props) {
  const FIXTURE_PROPS = {
    onClose: jest.fn(),
    ...props,
  };

  return render(<ComponentFixture {...FIXTURE_PROPS} />, { container: document.body });
}

function getInput(container, name) {
  return container.querySelector(`input[name="${name}"]`);
}

function getButton(container, name) {
  return container.querySelector(`button[name="${name}"]`);
}

describe('CreateFolderDialog', () => {
  test('renders and matches the snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  test('closes the modal', () => {
    const spy = jest.fn();
    const { container } = setup({ onClose: spy });

    fireEvent.click(getButton(container, 'cancel'));
    expect(spy).toBeCalledTimes(1);
  });

  test('name is a required field', () => {
    const spy = jest.fn();
    const { container } = setup({ onClose: spy });
    const name = getInput(container, 'name');

    fireEvent.click(getButton(container, 'submit'));
    expect(spy).toBeCalledTimes(0);

    fireEvent.change(name, { target: { value: 'folder name' } });
    fireEvent.click(getButton(container, 'submit'));

    expect(spy).toBeCalledTimes(1);
  });

  test('set default form values', () => {
    const { container } = setup({ folder: { name: 'default folder name', location: 1 } });

    expect(getInput(container, 'name').value).toBe('default folder name');
    expect(getInput(container, 'location').value).toBe('1');
  });
});
