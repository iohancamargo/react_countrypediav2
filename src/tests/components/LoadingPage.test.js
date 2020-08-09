import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoadingPage from '../../components/LoadingPage';

configure({adapter: new Adapter()});

test('should render LoadingPage correctly', () => {
    const wrapper = shallow(<LoadingPage />);
	expect(wrapper).toMatchSnapshot();
});