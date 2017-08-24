/*
 * Created by twj94 on 2017/8/24.
 */
import axios from 'axios'
export default {
  PoorCoverageList:(data)=>{
    return axios.post('/resources/netOverlayAnalysis/getPoorCoverageList',$.param(data));
  }
}
