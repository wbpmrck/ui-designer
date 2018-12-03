import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"

const className = 'UDOperator'
/**
 * 表示一个操作符
 * 操作符必须实现operateOn接口
 * 
 */
@DECORATORS.serializable(true)
class UDOperator{
    
    static getTypeName(){
        return 'UDOperator'
    }

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'操作符符号',value:undefined})
    operateSymbol(){};  //符号描述（决定了操作符如何进行运算）

    constructor({operateSymbol}) { 
        this.operateSymbol({value:operateSymbol});
    }

    /**
     * 对左右操作数进行计算，返回计算之后的结果
     * @param {Any} leftOperand 
     * @param {Any} rightOperand 
     */
    operateOn(leftOperand,rightOperand){
        throw new Error('operateOn must be implement by sub class!')
    }
}
regClass(className,UDOperator)

export default UDOperator;