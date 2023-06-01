import renderer from 'react-test-renderer';

import CurrentLocation from './CurrentLocation';

describe('<CurrentLocation />', () => {
  it('should be defined', () => {
    expect(CurrentLocation).toBeDefined();
  });

  it('should render nothing if NO location address is passed', () => {
    const tree = renderer.create(<CurrentLocation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
