import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'
import { UDCompareOperatorEnum,  UDArithmeticOperatorEnum,  UDLogicOperatorEnum,  UDRelationOperatorEnum}  from '../enums/ud-operator-enum'

const className = 'UDLogicOperator'
/**
 * 逻辑操作符
 * 
 * 
 */
@DECORATORS.serializable(true)
class UDLogicOperator extends UDOperator{
    
    static getTypeName(){
        return 'UDLogicOperator'
    }

    constructor({operateSymbol}) {
        super({operateSymbol});
    }

    operateOn(leftOperand,rightOperand){
        
        let symbol = this.operateSymbol().value;
        switch(symbol){
            case UDLogicOperatorEnum.AND.val: //与
                return leftOperand && rightOperand;

            case UDLogicOperatorEnum.OR.val: //或
                return leftOperand || rightOperand;
            
            default:
                throw new Error('ooperate symbol not recognize!:'+ symbol)
            break;
            
        }
    }
}
regClass(className,UDLogicOperator)

export default UDLogicOperator;