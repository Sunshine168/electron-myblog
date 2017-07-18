import Register from '../component/Register';
import redirect from '../hight-order-component/redirect';
import {connect} from 'react-redux';
import {showFlashMessage} from '../reducer/flashMessage';

const mapDispatchToProps = (dispatch)=>{
	return {
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		}
}
}
export default connect(null,mapDispatchToProps)(redirect(Register));
