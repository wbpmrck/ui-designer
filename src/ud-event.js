import {UDAttribute}  from "./ud-attribute"
import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"

const className = 'UDEvent'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
class UDEvent{
    
    name; //事件名称
    desc; //事件描述
    contextParams; //事件上下文参数.在事件处理函数中，可以使用这些参数

    constructor(name,desc,contextParams) {
        this.name = name;
        this.desc = desc;
        this.contextParams = contextParams;
    }
}
regClass(className,UDEvent)

export default UDEvent;