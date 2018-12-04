/*
    定义枚举：属性单位
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 属性单位类型
 */
let UDRange=regEnums('UDRange',(iota)=>{
return {
        APP:1, //影响整个app
        LAYER:2, //仅影响当前层级
    }
});


export default UDRange
