import renderer from 'react-test-renderer';

import Acknowledgements from './Acknowledgements';

describe('<Acknowledgements />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Acknowledgements />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
