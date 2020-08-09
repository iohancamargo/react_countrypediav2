import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailPage from '../../../components/pages/DetailPage';

configure({adapter: new Adapter()});
const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
);

test('should render DetailPage correctly', () => {
    const wrapper = shallow(<ReduxProvider><DetailPage /></ReduxProvider>);
	expect(wrapper).toMatchSnapshot();
});