import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'
import { UDCompareOperatorEnum,  UDArithmeticOperatorEnum,  UDLogicOperatorEnum,  UDRelationOperatorEnum}  from '../enums/ud-operator-enum'

const className = 'UDCompareOperator'
/**
 * 比较操作符
 * 
 * 
 */
@DECORATORS.serializable(true)
class UDCompareOperator extends UDOperator{
    
    static getTypeName(){
        return 'UDCompareOperator'
    }

    constructor({operateSymbol}) {
        super({operateSymbol});
    }

    /**
     * 使用左，右2个操作数，完成一个比较操作
     * @param {Any} leftOperand 
     * @param {Any} rightOperand 
     */
    operateOn(leftOperand,rightOperand){
        let symbol = this.operateSymbol().value;//获取当前比较运算符的符号
        switch(symbol){
            case UDCompareOperatorEnum.GT.val: //大于
                return leftOperand > rightOperand;

            case UDCompareOperatorEnum.GTE.val: //大于等于
                return leftOperand >= rightOperand;

            case UDCompareOperatorEnum.LT.val: //小于
                return leftOperand < rightOperand;

            case UDCompareOperatorEnum.LTE.val: //小于等于
                return leftOperand <= rightOperand;
                
            case UDCompareOperatorEnum.E.val: //等于
                return leftOperand === rightOperand;
                
            case UDCompareOperatorEnum.NE.val: //不等于
                return leftOperand !== rightOperand;

            default:
                throw new Error('ooperate symbol not recognize!:'+ symbol)
            break;
            
        }
    }
}
regClass(className,UDCompareOperator)

export default UDCompareOperator;