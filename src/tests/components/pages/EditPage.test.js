import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditPage from '../../../components/pages/EditPage';

configure({adapter: new Adapter()});

const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
);

test('should render EditPage correctly', () => {
    const wrapper = shallow(<ReduxProvider><EditPage /></ReduxProvider>);
	expect(wrapper).toMatchSnapshot();
});