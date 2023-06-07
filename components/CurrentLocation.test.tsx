import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import CurrentLocation from './CurrentLocation';

describe('<CurrentLocation />', () => {
  it('should be defined', () => {
    expect(CurrentLocation).toBeDefined();
  });

  it('should render nothing if NO location address is provided', () => {
    const { getByText } = render(<CurrentLocation />);
    const noLocationText = 'No location found.';
    const currentLocation = getByText(noLocationText);
    expect(currentLocation.children).toContain(noLocationText);
  });

  it('should render full location if full address is provided', () => {
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          city: 'Montauk',
          region: 'NY',
          subregion: 'US',
          country: 'United States',
        }}
      />
    );
    const cityText = 'Montauk,';
    const regionText = 'NY';
    const subregionText = 'US';
    const countryText = 'United States';
    const currentLocation = getByText(`${cityText} ${regionText}`);
    const currentSubLocation = getByText(`${countryText} (${subregionText})`);
    expect(currentLocation.children).toContain(cityText);
    expect(currentLocation.children).toContain(regionText);
    expect(currentSubLocation.children.join('')).toContain(
      `${countryText} (${subregionText})`
    );
  });

  it('should render an errorMessage when set', () => {
    const errorMessage =
      'An error occurred attempting find the given location.';
    const { getByText } = render(
      <CurrentLocation errorMessage={errorMessage} />
    );
    const currentLocation = getByText(errorMessage);

    expect(currentLocation.children).toContain(errorMessage);
  });

  it('should render just city location text', () => {
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          city: 'Montauk',
        }}
      />
    );
    const cityText = 'Montauk';
    const currentLocation = getByText(cityText);
    expect(currentLocation.children).toContain(cityText);
  });

  it('should render just region location text', () => {
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          region: 'NY',
        }}
      />
    );
    const regionText = 'NY';
    const currentLocation = getByText(regionText);
    expect(currentLocation.children).toContain(regionText);
  });

  it('should render just country location text', () => {
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          country: 'United States',
        }}
      />
    );
    const countryText = 'United States';
    const currentLocation = getByText(countryText);
    expect(currentLocation.children).toContain(countryText);
  });

  it('should render just subregion location text', () => {
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          subregion: 'US',
        }}
      />
    );
    const subregionText = 'US';
    const currentLocation = getByText(`(${subregionText})`);
    expect(currentLocation.children.join('')).toContain(`(${subregionText})`);
  });

  it('should render error message and current location', () => {
    const errorMessage =
      'An error occurred attempting find the given location.';
    const { getByText } = render(
      <CurrentLocation
        locationAddress={{
          city: 'Montauk',
          region: 'NY',
          subregion: 'US',
          country: 'United States',
        }}
        errorMessage={errorMessage}
      />
    );
    const cityText = 'Montauk,';
    const regionText = 'NY';
    const subregionText = 'US';
    const countryText = 'United States';
    const currentLocation = getByText(`${cityText} ${regionText}`);
    const currentSubLocation = getByText(`${countryText} (${subregionText})`);
    expect(currentLocation.children).toContain(cityText);
    expect(currentLocation.children).toContain(regionText);
    expect(currentSubLocation.children.join('')).toContain(
      `${countryText} (${subregionText})`
    );
    const errorMessageResult = getByText(errorMessage);

    expect(errorMessageResult.children).toContain(errorMessage);
  });
});
