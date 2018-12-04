/*
    定义枚举：操作符 类型
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 比较 操作符
 */
let UDCompareOperatorEnum=regEnums('UDCompareOperatorEnum',(iota)=>{
return {
        GT:1, // 大于
        GTE:2, // 大于等于
        LE:3, // 小于
        LTE:4, // 小于等于
        E:5, // 等于
        NE:6, // 不等于
    }
});


/**
 * 算数 操作符
 */
let UDArithmeticOperatorEnum=regEnums('UDArithmeticOperatorEnum',(iota)=>{
    return {
            ADD:1, // 加法
            SUB:2, // 减法
            MUL:3, // 乘法
            DIV:4, // 除法
        }
    });

/**
 * 逻辑 操作符
 */
let UDLogicOperatorEnum=regEnums('UDLogicOperatorEnum',(iota)=>{
    return {
            AND:1, // 与
            OR:2, // 或
        }
    });

/**
 * 关系 操作符
 */
let UDRelationOperatorEnum=regEnums('UDRelationOperatorEnum',(iota)=>{
    return {
            CONTAIN:1, // 包含
            NOT_CONTAIN:2, // 不包含
        }
    });

export {
    UDCompareOperatorEnum,  
    UDArithmeticOperatorEnum,  
    UDLogicOperatorEnum,  
    UDRelationOperatorEnum,  
} 
