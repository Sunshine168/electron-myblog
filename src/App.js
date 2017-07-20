import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import {StyleRoot} from 'radium';
import {connect} from 'react-redux';
import logo from './logo.svg';
import Header from './container/Header';
import Login from './container/Login';
import Register from './container/Register';
import ArticleList from './container/ArticleList'
import FlashMessage from './container/FlashMessage'
import PostArticle from './container/PostArticle'
import LoadArticle from './container/LoadArticle'
import NoMatch from './component/NoMatch';
import ProgressBars from './container/ProgressBars'
import Index from './component/Index'
import OffLineHandle from './container/OffLineHandle';
import './css/common.css';
const TestScreen = ()=>(
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      My first try
    </p>
  </div>
)


//auth 处理需要登录的路由
const PrivateRoute = ({ component: Component,auth, ...rest }) => {
return (  <Route {...rest} render={props => (
  auth.user ? (
    <Component {...props}/>
  ) : (
    <Redirect to={{
        pathname: '/login',
      state: { from: props.location }
    }}/>
  )
)}/>)
}


//用户主页
const UserIndex = ({ match })=>(
  <Route
    path={`${match.url}/:userId`}
    component={ArticleList}/>
)
//编辑文章
const EditArticle = ({ match }) => (
    <Route path={`${match.url}/:articleId`} component={PostArticle}/>
)
//查看文章页面
const  ArticleDetail = ({match})=>(
  <Route path={`${match.url}/:articleId`} component={LoadArticle}/>
)
const mapStateToProps = (state)=>{
  return {
    login:state.login
  }
}
/*
处理服务器重定向问题与404
 */
const RedirectFromServer = ({match})=>{
  //deal the sever redirect
  let url = window.location.search;
  return url.substring(1)?<Redirect to={{
    pathname: url.substring(1),
    state: { from: '/' }
  }}/>:<NoMatch/>
}
class App extends Component {
   componentDidMount(){
     let loading = document.getElementById('loading');
     loading.style.display="none";
   }
   render(){
 let auth = this.props.login
 return (
   <StyleRoot>
     <Router>
       <div>
         <ProgressBars/>
         <Header/>
         <div className="container_wrap">
           <FlashMessage/>
           <Switch>
             <Route exact path="/index" component={Index}/>
             <Route path="/login" component={Login}/>
             <Route path="/loginOut" component={Login}/>
             <Route path="/register" component={Register}/>
             <Route path="/user" component={UserIndex}/>
             <Route path="/article" component={ArticleDetail}/>
             <PrivateRoute path="/edit/article"
               component={EditArticle}
               auth={auth}
             />
             <PrivateRoute
               path="/personal/index"
               component={ArticleList}
               auth={auth}
             />
             <PrivateRoute
               path="/postArticle"
               component={PostArticle}
               auth={auth}
             />
             <Route  path="/" component={RedirectFromServer}/>
           </Switch>
         </div>
     </div>
     </Router>
   </StyleRoot>)
}

}

export default connect(mapStateToProps)(App);
