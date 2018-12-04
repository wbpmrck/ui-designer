import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'

const className = 'UDExpression'
/**
 * 表示一个表达式
 * 
 * 1、一个表达式可以有1个返回值
 * 2、表达式是由1个操作符，加左、右2个子表达式构成
 * 3、当表达式要计算的时候，需要首先计算左侧的表达式，然后再计算右侧的表达式，然后利用中间的操作符来完成计算
 * 4、这是一个递归的过程
 * 
 */
@DECORATORS.serializable(true)
class UDExpression{
    

    static getTypeName(){
        return 'UDExpression'
    }
    // @DECORATORS.serializable(true)
    // @DECORATORS.field({type:Type.getType(),desc:'返回值类型',value:Types.ANY})
    // returnType(){};  //表达式的返回类型

    // @DECORATORS.serializable(true)
    // @DECORATORS.field({type:Types.ANY,desc:'返回值',value:undefined})
    // returnValue(){};  //表达式实际返回的值


    @DECORATORS.serializable(true)
    @DECORATORS.field({type:UDOperator.getType(),desc:'操作符',value:undefined})
    operator(){};  //操作符，包括 比较操作符、逻辑操作符、算数操作符

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ANY,desc:'左操作数',value:undefined})
    leftOperand(){};  //左操作数（也可以是一个表达式）

    
    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ANY,desc:'左操作数',value:undefined})
    rightOperand(){};  //右操作数（也可以是一个表达式）


    constructor({operator,leftOperand,rightOperand}) {
        this.operator({value:operator});
        this.leftOperand({value:leftOperand});
        this.rightOperand({value:rightOperand});

    }

    //执行表达式，得到结果
    execute(){
        let op = this.operator();
        let leftOperand = this.leftOperand();
        let rightOperand = this.rightOperand();
        //先计算左操作数
        if(isInstanceOf(leftOperand,'UDExpression')){
            // leftOperand = leftOperand.execute().returnValue().value;
            leftOperand = leftOperand.execute();
        }

        //再计算右操作数
        if(isInstanceOf(rightOperand,'UDExpression')){
            // rightOperand = rightOperand.execute().returnValue().value;
            rightOperand = rightOperand.execute();
        }

        //使用操作符，对左右2个操作数进行操作，并返回一个值

        //如果没有操作符，则表示是一个字面量表达式，返回左操作数即可
        if(op === undefined){
            // this.returnValue({value:leftOperand});
            return leftOperand;
        }else{
            //否则，使用操作符来计算结果
            // this.returnValue({value:op.operateOn(leftOperand,rightOperand)});
            return op.operateOn(leftOperand,rightOperand);
        }
        // return this;
    }
}
regClass(className,UDExpression)

export default UDExpression;