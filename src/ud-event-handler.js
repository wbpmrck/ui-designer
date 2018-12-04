import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "./ud-runtime"
import UDAction from "./ud-action"
import UDExpression from './logic/ud-expression'

const className = 'UDEventHandler'
/**
 * 事件处理逻辑。
 * 每一个制作完的应用，都会维护一个事件处理逻辑列表，里面指定了当什么对的什么事件发生（且符合其他条件）的时候，做什么处理
 * 
 */
@DECORATORS.serializable(true)
class UDEventHandler{
    
    static getTypeName(){
        return 'UDEventHandler'
    }
    eventFrom; //发生事件的对象

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'事件名称',value:''})
    eventName(){};  //事件名称


    @DECORATORS.serializable(true)
    @DECORATORS.field({type:UDExpression.getType(),desc:'事件发生条件表达式',value:undefined})
    expression(){};  //事件发生条件表达式

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ARRAY(UDAction.getType()),desc:'事件响应行为列表',value:[]})
    actions(){};  //事件响应行为列表

    

    constructor({eventName,expression,actions,eventFrom}) {
        this.eventName({value:eventName});
        this.expression({value:expression});
        this.actions({value:actions});
        this.eventFrom = eventFrom;
    }
}
regClass(className,UDEventHandler)

export default UDEventHandler;