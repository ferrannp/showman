import { connect } from 'react-redux'
import Show from '../components/Show'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  return {
    ...state.show
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);