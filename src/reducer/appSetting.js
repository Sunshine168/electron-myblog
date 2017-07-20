 const OFFLINE = 'OFFLINE'
 const ONLINE = 'ONLINE'
 const ADD_OFFLINE_MISSION = 'ADD_OFFLINE_MISSION'
 const DELETE_OFFLINE_MISSION = 'DELETE_OFFLINE_MISSION'
 const CLEAR_OFFLINE_MISSION = 'CLEAR_OFFLINE_MISSION'
 const appSetting = (state,action)=>{
   if(!state){
     return {
       netWorkStatus:1,
       offLineMission:[],
     }
   }
   switch(action.type){
     case OFFLINE:
     return{
       ...state,
       netWorkStatus:0
     }
     case ONLINE:
     return {
       ...state,
       netWorkStatus:1
     }
     case DELETE_OFFLINE_MISSION:
     return {
       ...state,
       offLineMission:[
         ...state.offLineMission.slice(0,action.missionIndex),
         ...state.offLineMission.slice(action.missionIndex+1)
       ]
     }
     case ADD_OFFLINE_MISSION:
     return {
       ...state,
       offLineMission:[...state.offLineMission,action.mission]
     }
     case CLEAR_OFFLINE_MISSION:
     return {
       ...state,
       offLineMission:[]
     }
     default:
     return state;
   }
 }
 //action
 export const offLineNetWork = ()=>{
  return {type:OFFLINE}
 }
 export const onLineNetWork = ()=>{
  return {type:ONLINE}
 }
 export const addMission = (mission)=>(
   {
     type:ADD_OFFLINE_MISSION,
     mission
   }
 )
 export const deleteMission = (missionIndex)=>({type:DELETE_OFFLINE_MISSION})
 export const clearOffLineMission = ()=>({type:CLEAR_OFFLINE_MISSION})
 export default  appSetting;
