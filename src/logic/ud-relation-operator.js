import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'
import { UDCompareOperatorEnum,  UDArithmeticOperatorEnum,  UDLogicOperatorEnum,  UDRelationOperatorEnum}  from '../enums/ud-operator-enum'

const className = 'UDRelationOperator'

/**
 * 判断src里是否含有target
 * @param {String} src 
 * @param {String} target 
 */
function stringContain(src,target){
    return src.indexOf(target)>-1;
}

/**
 * 校验在数组里有没有指定的条目
 * @param {Array} srcArr 
 * @param {Any} targetItem 
 */
function arrayContain(srcArr,targetItem){
    for(var i=0;i<srcArr.length;i++){
        if(srcArr[i]===targetItem){
            return true;
        }
    }
    return false;
}
/**
 * 算数操作符
 * 
 * 
 */
@DECORATORS.serializable(true)
class UDRelationOperator extends UDOperator{
    
    static getTypeName(){
        return 'UDRelationOperator'
    }

    constructor({operateSymbol}) {
        super({operateSymbol});
    }

    operateOn(leftOperand,rightOperand){
        
        let symbol = this.operateSymbol().value;
        switch(symbol){
            case UDRelationOperatorEnum.CONTAIN.val: //包含
                //如果是字符串，则计算字符串包含
                if(isInstanceOf(leftOperand,String.getType())){
                    return stringContain(leftOperand,rightOperand)
                }else if(isInstanceOf(leftOperand,Array.getType())){
                    //如果是数组，则计算数组包含
                    return arrayContain(leftOperand,rightOperand)

                }else{
                    throw new Error('leftOperand must be String or Array!')
                }

            case UDRelationOperatorEnum.NOT_CONTAIN.val: //不包含
                //如果是字符串，则计算字符串包含
                if(isInstanceOf(leftOperand,String.getType())){
                    return !stringContain(leftOperand,rightOperand)
                }else if(isInstanceOf(leftOperand,Array.getType())){
                    //如果是数组，则计算数组包含
                    return !arrayContain(leftOperand,rightOperand)

                }else{
                    throw new Error('leftOperand must be String or Array!')
                }

            default:
                throw new Error('ooperate symbol not recognize!:'+ symbol)
            break;
            
        }
    }
}
regClass(className,UDRelationOperator)

export default UDRelationOperator;