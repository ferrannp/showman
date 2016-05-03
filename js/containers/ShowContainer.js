import { connect } from 'react-redux'
import ShowView from '../components/ShowView'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

function mapStateToProps(state) {
  return {
    ...state.show
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowView);