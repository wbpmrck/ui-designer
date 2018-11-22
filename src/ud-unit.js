/*
    定义枚举：属性单位
*/


import {regEnums,regClass,createClassObject,Types,UDEnumBase} from "./ud-runtime"
/**
 * 属性单位类型
 */
let UDAttributeUnit=regEnums('UDAttributeUnit',(iota)=>{
return {
        PX:iota(),
        PERCENTAGE:iota(),
        ANGLE:iota(),
        NONE:iota(),
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
