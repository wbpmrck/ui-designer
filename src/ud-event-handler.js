import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "./ud-runtime"

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
    eventName(){};  //节点的孩子

    constructor() {
    }
}
regClass(className,UDEventHandler)

export default UDEventHandler;