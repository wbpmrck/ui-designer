/*
    定义枚举：属性单位
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 属性单位类型
 */
let UDRange=regEnums('UDRange',(iota)=>{
return {
        APP:iota(), //影响整个app
        LAYER:iota(), //仅影响当前层级
    }
});


export default UDRange
