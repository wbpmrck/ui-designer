import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"

const className = 'UDEventHandler'
/**
 * 事件处理逻辑。
 * 每一个制作完的应用，都会维护一个事件处理逻辑列表，里面指定了当什么对的什么事件发生（且符合其他条件）的时候，做什么处理
 * 
 */
class UDEventHandler{
    
    name; //事件名称,在发生时间的对象内，该名称应该是唯一的
    desc; //事件描述
    contextParams; //事件上下文参数.在事件处理函数中，可以使用这些参数

    constructor({name,desc,contextParams}) {
        this.name = name;
        this.desc = desc;
        this.contextParams = contextParams;
    }
}
regClass(className,UDEventHandler)

export default UDEventHandler;