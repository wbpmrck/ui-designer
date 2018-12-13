/*
    定义枚举：属性单位
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 属性单位类型
 */
let UDAttributeUnit=regEnums('UDAttributeUnit',(iota)=>{
return {
        PX:1,
        PERCENTAGE:2,
        ANGLE:3,
        NONE:4,
    }
});

// class AttributeUnit extends UDEnumBase{
//     static PX='px'
//     static PERCENTAGE='percent'
//     static ANGLE='angle'
//     static NONE='none'

//     constructor(val){
//         super(val)
//     }
// }

/*
  let a= AttributeUnit.PX;
  isInstanceOf(a,AttributeUnit);
  a === AttributeUnit.ANGLE; // false
*/


export {UDAttributeUnit}
