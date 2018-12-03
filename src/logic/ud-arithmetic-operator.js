import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'
import { UDCompareOperatorEnum,  UDArithmeticOperatorEnum,  UDLogicOperatorEnum,  UDRelationOperatorEnum}  from '../enums/ud-operator-enum'

const className = 'UDArithmeticOperator'
/**
 * 算数操作符
 * 
 * 
 */
@DECORATORS.serializable(true)
class UDArithmeticOperator extends UDOperator{
    
    static getTypeName(){
        return 'UDArithmeticOperator'
    }

    constructor({operateSymbol}) {
        super({operateSymbol});
    }

    operateOn(leftOperand,rightOperand){
        let symbol = this.operateSymbol().value;
        switch(symbol){
            case UDArithmeticOperatorEnum.ADD.val: //加法
                return leftOperand + rightOperand;

            case UDArithmeticOperatorEnum.SUB.val: //减法
                return leftOperand - rightOperand;
            
            case UDArithmeticOperatorEnum.MUL.val: //乘法
                return leftOperand * rightOperand;
                
            case UDArithmeticOperatorEnum.DIV.val: //除法
                return leftOperand / rightOperand;
            
            default:
                throw new Error('ooperate symbol not recognize!:'+ symbol)
            break;
            
        }
    }
}
regClass(className,UDArithmeticOperator)

export default UDArithmeticOperator;