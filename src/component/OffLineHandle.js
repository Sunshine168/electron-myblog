import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {addPost,addComment} from '../service/fetch'
import {Button} from 'react-bootstrap'
import classNames from 'classnames'
export default class OffLineHandle extends Component {
  static propTypes=({
    onLineNetWork:PropTypes.func,
    offLineNetWork:PropTypes.func,
    deleteMission:PropTypes.func,
    netWorkStatus:PropTypes.number,
    offLineMission:PropTypes.array
  })
  constructor(props){
    super(props)
    this._changeNetWorkStatus  = this._changeNetWorkStatus.bind(this)
  }
 componentDidMount(){
  console.log(this.props)
  const {ipcRenderer} = window.require('electron')
  //init ipcRenderer  event listenr
  ipcRenderer.on('online-status-changed',async function(event,args){
       console.log(args)
       if(args == 'offline'){
         //切换到离线状态
         this.props.offLineNetWork()
       }
       if(args == 'online'){
         this.props.onLineNetWork()
       }
  }.bind(this));
}
  _changeNetWorkStatus(){
    /* 有可能有新的状态添加 */
      if(this.props.netWorkStatus==1){
          this.props.offLineNetWork()
      }
      if(this.props.netWorkStatus==0){
          this.props.onLineNetWork()
      }
  }
   /*
   任务类型
   article 和 comment
    */
  async _postOffLineMission(missions){
      //空任务退出
      if(!missions||missions.length == 0){
        return;
      }
      let result;
      for(let i = 0; i<missions.length ;i++){
         if(missions[i].type == 'postArticle'){
           // 文章类型
           result = await addPost(missions[i].content);
         }
         if(missions[i].type == 'comment'){
           // 评论类型
           result = await addComment(missions[i].content);
         }
         if(result.code == 1){
           //发布成功
           this.props.deleteMission(i)
         }
      }
      if(missions.length == 0){
        //处理完成
      }
  }
  componentDidUpdate(prevProps, prevState) {
  /*从离线转换成在线模式*/
  if (prevProps.netWorkStatus == 0 && this.props.netWorkStatus == 1) {
      //....
      let {missions} = this.props
      this._postOffLineMission(missions)
  }
}
  render(){
    console.log(this.props)
    return <div>
      <Button bsStyle={
        classNames({"warning":this.props.netWorkStatus==1,
        "info":this.props.netWorkStatus==0})
      }
        onClick = {this._changeNetWorkStatus}>{this.props.netWorkStatus==1?"切换到离线状态":"切换到在线状态"}</Button></div>
  }
}
