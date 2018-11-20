/*
    定义枚举：属性单位
*/


import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"
/**
 * 属性单位类型
 */
let AttributeUnit=regEnums('AttributeUnit',(iota)=>{
return {
        px:iota(),
        percentage:iota(),
        angle:iota(),
    }
});


export {AttributeUnit}
