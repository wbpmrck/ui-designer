/*
    定义枚举：操作符 类型
*/


import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"
/**
 * 比较 操作符
 */
let UDCompareOperatorEnum=regEnums('UDCompareOperatorEnum',(iota)=>{
return {
        GT:iota(), // 大于
        GTE:iota(), // 大于等于
        LE:iota(), // 小于
        LTE:iota(), // 小于等于
        E:iota(), // 等于
        NE:iota(), // 不等于
    }
});


/**
 * 算数 操作符
 */
let UDArithmeticOperatorEnum=regEnums('UDArithmeticOperatorEnum',(iota)=>{
    return {
            ADD:iota(), // 加法
            SUB:iota(), // 减法
            MUL:iota(), // 乘法
            DIV:iota(), // 除法
        }
    });

/**
 * 逻辑 操作符
 */
let UDLogicOperatorEnum=regEnums('UDLogicOperatorEnum',(iota)=>{
    return {
            AND:iota(), // 与
            OR:iota(), // 或
        }
    });

/**
 * 关系 操作符
 */
let UDRelationOperatorEnum=regEnums('UDRelationOperatorEnum',(iota)=>{
    return {
            CONTAIN:iota(), // 包含
            NOT_CONTAIN:iota(), // 不包含
        }
    });

export {
    UDCompareOperatorEnum,  
    UDArithmeticOperatorEnum,  
    UDLogicOperatorEnum,  
    UDRelationOperatorEnum,  
} 
