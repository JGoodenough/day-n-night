import renderer from 'react-test-renderer';

import Acknowledgements from './Acknowledgements';
import { A } from '@expo/html-elements';

describe('<Acknowledgements />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Acknowledgements />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
