import { connect } from 'react-redux';

import {
    checkLoggedStatus,
    loginUser,
} from '../../../store/actions';

import FormWrapper from './FormWrapper';

const mapStateToProps = state => ({
    api: state.userSessionReducer.api,
    errorMsg: state.userSessionReducer.errorMsg,
});

export default connect(
    mapStateToProps,
    { checkLoggedStatus, loginUser },
)(FormWrapper);