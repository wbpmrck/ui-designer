import {UDAttribute,createAttribute}  from "../ud-attribute"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field} from "../ud-runtime"

import {UDAttributeUnit}  from "../ud-unit"
import UDTouch from "./ud-touch"

const className = 'UDTouchEventContext'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
@DECORATORS.serializable(true)
class UDTouchEventContext{
    
    // @DECORATORS.serializable(true)
    // @DECORATORS.field(Types.CLASS(UDAttribute))
    altKey = field({type:Types.CLASS(UDAttribute),serializable:false}); //键盘 alt 键是否被按下
    // altKey=createAttribute(false,Types.BOOLEAN,UDAttributeUnit.NONE); //键盘 alt 键是否被按下
    ctlKey=createAttribute(false,Types.BOOLEAN,UDAttributeUnit.NONE); //键盘 ctl 键是否被按下
    shiftKey=createAttribute(false,Types.BOOLEAN,UDAttributeUnit.NONE); //键盘 shift 键是否被按下

    touches=createAttribute([],Types.ARRAY(UDTouch),UDAttributeUnit.NONE); //一 个 Touch数组 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化
    targetTouches=createAttribute([],Types.ARRAY(UDTouch),UDAttributeUnit.NONE); //一 个 Touch数组 对象，包含了如下触点的 Touch 对象：触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点。

    constructor({altKey,ctlKey,shiftKey}) {
        this.ctlKey.setValue(ctlKey);
        this.shiftKey.setValue(shiftKey);
    }
}
regClass(className,UDTouchEventContext)

export default UDTouchEventContext;