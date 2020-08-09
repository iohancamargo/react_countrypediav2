import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageNotFound from '../../components/PageNotFound';

configure({adapter: new Adapter()});

test('should render PageNotFound correctly', () => {
    const wrapper = shallow(<PageNotFound />);
	expect(wrapper).toMatchSnapshot();
});