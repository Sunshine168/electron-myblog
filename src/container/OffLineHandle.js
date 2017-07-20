import {offLineNetWork,
  onLineNetWork,
  addMission,
  deleteMission,
  clearOffLineMission
} from '../reducer/appSetting'
import OffLineHandle from '../component/OffLineHandle'
import {connect} from 'react-redux';

const mapStateToProps = (state)=>(
  state.appSetting
)

const mapDispatchToProps = (dispath)=>{
  return {
    onLineNetWork:()=>{
      dispath(onLineNetWork())
    },
    offLineNetWork:()=>{
      dispath(offLineNetWork())
    },
    deleteMission:(missionIndex)=>{
       dispath(deleteMission(missionIndex))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OffLineHandle)
