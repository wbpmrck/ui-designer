import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute,isInstanceOf} from "../ud-runtime"
import UDOperator from './ud-operator'

const className = 'UDAttributeVisitOperator'
/**
 * 属性访问操作符
 * 1、当前仅支持对属性进行取值
 * 2、TODO:后续需要考虑如何支持对对象的方法返回值进行取值，也即：如何可以实现调用对象的方法，并传递参数，拿到返回值
 * 
 */
@DECORATORS.serializable(true)
class UDAttributeVisitOperator extends UDOperator{
    
    static getTypeName(){
        return 'UDAttributeVisitOperator'
    }

    constructor({operateSymbol}) {
        super({operateSymbol});
    }

    operateOn(leftOperand,rightOperand){
        //属性访问操作符比较特殊，他不存在多种操作符，只需要直接对左操作数的属性、方法进行取值即可

        // TODO: 这里等到实现Runtime的时候，再实现，因为需要根据对象id拿到对象引用，需要运行时的支持
    }
}
regClass(className,UDAttributeVisitOperator)

export default UDAttributeVisitOperator;