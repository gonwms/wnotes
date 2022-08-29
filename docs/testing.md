# Testing

## test.utils.js

Agregar todos los providers

```javascript
//utils.test.js

import { Provider } from 'react-redux';
import { store } from 'store/store';
import { render } from '@testing-library/react';

export const rendeInContext = (element: React.ReactElement) => {
  render(<Provider store={store}>{element}</Provider>);
};
```

## Router V6

```javascript
// *.test.js

import { AddUsers } from 'pages/AddUsers/AddUsers';
import { User } from 'pages/User/User';
import { rendeInContext } from 'tests.utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

beforeEach(() => {
  rendeInContext(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'user/62730f69ff754bbfb6c0afa5'} replace />} />
        <Route path="/user/:userId" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
});

describe('AddUsers', () => {
  it('should be in the correct URL "/user/:userId', async () => {
    expect(location.pathname).toEqual('/user/62730f69ff754bbfb6c0afa5');
  });
  it('should have a title "user"', () => {
    expect(screen.getByRole('heading', { name: /user/i })).toBeInTheDocument();
  });
  it('should exits text "gon"', () => {
    expect(screen.getByText(/gon/i)).toBeInTheDocument();
  });
  it('should exits text "juan"', async () => {
    expect(screen.getByText(/juan/i)).toBeInTheDocument();
  });
});
```

## mocks

### jest.fn

### jest.spyOn

### jest.mock

### WMS

## Unit Test functions

toEqual == same value
ToBe === same object

```javascript
// *.test.js

import { serverResponse, serverResponseAfterFormat, formatLocationDataDefault } from 'mocks/mockData';
import { formatLocationData } from 'components/Locations/utils';

describe('formatLocationData util function ', () => {
  it('Should be return a default object', () => {
    const res = formatLocationData('DUMMY ARGUMENT');
    expect(res).toEqual(formatLocationDataDefault);
  });

  it('Should be return formated data if data is passed ', () => {
    const res = formatLocationData(serverResponse.data);
    expect(res).toEqual(serverResponseAfterFormat);
  });
});
```
