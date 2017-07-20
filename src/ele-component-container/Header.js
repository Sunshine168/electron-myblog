import {connect} from 'react-redux';
import {Header} from '../electron-component/Header';
import { withRouter } from 'react-router-dom';
import {showFlashMessage,removeFlashMessage} from '../reducer/flashMessage';
import {loginOut} from '../reducer/user'
const mapStateToProps = (state)=>(
  state.login
)
const mapDispatchToProps= (dispatch)=>{
  return{
    loginOut:()=>{dispatch(loginOut())},
    showFlashMessage:(message)=>{
      dispatch(showFlashMessage(message))
    },
    removeFlashMessage:()=>{
      dispatch(removeFlashMessage());
    }
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
