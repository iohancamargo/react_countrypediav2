import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../../components/pages/HomePage';

const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
);

configure({adapter: new Adapter()});

test('should render HomePage correctly', () => {
    const wrapper = shallow(<ReduxProvider><HomePage /></ReduxProvider>);
	expect(wrapper).toMatchSnapshot();
});