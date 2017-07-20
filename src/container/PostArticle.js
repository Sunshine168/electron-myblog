import PostArticle from '../component/PostArticle';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirect from '../hight-order-component/redirect';
import {showFlashMessage,
  removeFlashMessage} from '../reducer/flashMessage';
import {postArticleStarted,
  postArticleSuccess,
  postArticleFailure,
  successPost,
  failurePost
}from '../reducer/article'
import {addMission} from '../reducer/appSetting'
import {addPost} from '../service/fetch'
const mapStateToProps = (state)=>{
  return {
    user:state.login.user,
    posting:state.article.posting,
    netWorkStatus:state.appSetting.netWorkStatus,
  }
}
const mapDispatchToProps = (dispatch)=>{
	return {
    addPost:async(article)=>{
      dispatch(postArticleStarted());
      let result = await addPost(article);
      if(result.code==1){
        postArticleSuccess(result.post);
        dispatch(showFlashMessage(successPost("发表文章成功")))
        return true;
      }else{
        dispatch(showFlashMessage(failurePost("发表文章失败")))
        dispatch(postArticleFailure(result.message))
        return false;
    }
    return null;
  },
		showFlashMessage:(message)=>{
			dispatch(showFlashMessage(message))
		},
		removeFlashMessage:()=>{
			dispatch(removeFlashMessage());
		},
    addMission:(mission)=>{
        dispatch(showFlashMessage(successPost("已经加入离线队列")))
        dispatch(addMission(mission))
    }
	}
}
export default redirect(withRouter(connect(mapStateToProps,mapDispatchToProps)(PostArticle)));
