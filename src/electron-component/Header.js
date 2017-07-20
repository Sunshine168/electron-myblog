import React, {
	Component,
} from 'react';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import {Navbar,Nav,NavDropdown,NavItem,MenuItem,PageHeader,Popover,OverlayTrigger} from'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import OffLineHandle from '../container/OffLineHandle';
const afterLoginAction = [{title:"个人主页",evenKey:"2",href:"/personal/index"},
{title:"发表文章",evenKey:"2.1",href:"/postArticle"},
{title:"退出登录",evenKey:"2.2",href:"/loginOut"}]
const beforeLoginAction = [{title:"登录",evenKey:"3",href:"/login"},
{title:"注册",evenKey:"3.1",href:"/register"}]

/*
目前设计的导航栏耦合性还是非常高。。
 */
 const popoverClick = (
   <Popover id="popover-trigger-click" title="分享你的blog">
     <strong>你的博客链接已经复制到粘贴板上</strong>
   </Popover>
 );

const NavbarInstance = (props)=>{
	let {user} = props,url="";
	let  actionsList=user?afterLoginAction:beforeLoginAction;
	//获取当期blog url的方法
		const getBlogUrl = (id)=>{
			//获取主机名
			let hostname = window.location.hostname;
			//判断开发模式
			if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
				//开发模式下需要获取端口
				let port = location.port;
				url=`localhost:${port}/user/${id}`
      }else{
				url=hostname+`/user/${id}`;
			}
			return url;
		}
             return(
             <div className="left-silde">
               <Nav stacked onSelect={eventKey=>props.dropDownEvent(eventKey)}>
								 <NavItem>
									 <OffLineHandle/>
								 </NavItem>
								 <NavItem>
									 <Link to="/">
										 <span className="cursorPoint">主页</span>
									 </Link>
								 </NavItem>
								 {user?
									 <CopyToClipboard
										 text={getBlogUrl(user._id)}>
										 <OverlayTrigger trigger="click"
											 rootClose
											 placement="bottom"
											 overlay={popoverClick}>
											 <NavItem
												 eventKey={0}
												 href="#">
												 分享
											 </NavItem>
										 </OverlayTrigger>
									 </CopyToClipboard>
									 :null
								 }
								 {actionsList.map(item => (
									 <LinkContainer to={item.href} key={item.evenKey}>
										 <NavItem key={item.evenKey} eventKey={item.evenKey}>{item.title}</NavItem>
									 </LinkContainer>
								 ))}
							 </Nav>
						 </div>
  )
}

const NavHeader = (props)=>{
  return <div  className="content_center">
    <PageHeader>
      {props.title}<small>{props.introduce}</small>
    </PageHeader>

  </div>;
}

export class Header extends Component{
static propTypes={
	user:PropTypes.object,
	loginOut:PropTypes.func,
	showFlashMessage:PropTypes.func,
	removeFlashMessage:PropTypes.func,
}
constructor(props){
  super(props);
  this.state={
      blogTitle :"MyBolg",
      blogIntroduce:"introduce"
  }
}
navEventHandler(key){
//通过Key判断下拉栏选中状态
if(key=="2.2"){
/*处理注销的逻辑放在该函数中执行*/
this._loginOutConfirm()
}

}
render(){
	let {user} = this.props;
  return(
       <NavbarInstance
				 user={user}
				 dropDownEvent= {(key)=>this.navEventHandler(key)}
			 />
)
}
_loginOutConfirm(){
 /*
 通过异步通信机制进行确定用户是否要注销
  */
  const {ipcRenderer} = window.require('electron')
	ipcRenderer.send('loginOutConfirm')
	/* 事件监听 */
	 ipcRenderer.on('loginOut',function(event, arg){
 	  console.log(arg) // prints "pong"
 	  //arg返回 0 代表确定注销,1 代表取消
 	    if(arg === 0){
 				this.props.loginOut();
 				this.props.showFlashMessage({
 					msg:"注销成功",
 					msgType:"success",
 				})
 			}
 	  }.bind(this))
 }
}
