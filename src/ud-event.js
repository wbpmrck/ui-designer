import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"

const className = 'UDEvent'
/**
 * 一个事件
 * 各个平台的实现引擎，会根据对象声明支持的事件列表，去实现这些生命周期事件
 */
class UDEvent{
    
    name; //事件名称,在发生事件的对象内，该名称应该是唯一的
    desc; //事件描述
    contextParams; //事件上下文参数.在事件处理函数中，可以使用这些参数

    constructor({name,desc,contextParams}) {
        this.name = name;
        this.desc = desc;
        this.contextParams = contextParams;
    }
}
regClass(className,UDEvent)

export default UDEvent;