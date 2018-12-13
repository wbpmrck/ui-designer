import {regEnums,regClass,createClassObject,Types,DECORATORS,field} from "../ud-runtime"

import {UDAttributeUnit}  from "../enums/ud-unit"
import UDTouch from "./ud-touch"

const className = 'UDTouchEventContext'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
@DECORATORS.serializable(true)
class UDTouchEventContext{

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Boolean.getType(),desc:'alt 键是否被按下',value:false})
    altKey(){}

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Boolean.getType(),desc:'shift 键是否被按下',value:false})
    shiftKey(){}

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Boolean.getType(),desc:'ctl 键是否被按下',value:false})
    ctlKey(){}
    
    @DECORATORS.field({type:Types.ARRAY(UDTouch.getType()),desc:'所有当前接触触摸平面的触点的 Touch 对象',value:[]})
    touches(){}

    @DECORATORS.field({type:Types.ARRAY(UDTouch.getType()),desc:'触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点的 Touch 对象',value:[]})
    targetTouches(){}
    // // altKey = field({type:Types.CLASS(UDAttribute),serializable:false}); //键盘 alt 键是否被按下
    // // altKey= DECORATORS.serializable(true)(createAttribute('alt键是否被按下',false,Boolean.getType())); //键盘 alt 键是否被按下
    // ctlKey=createAttribute('ctl键是否被按下',false,Boolean.getType()); //键盘 ctl 键是否被按下
    // shiftKey=createAttribute('shift键是否被按下',false,Boolean.getType()); //键盘 shift 键是否被按下

    // touches=createAttribute('所有当前接触触摸平面的触点的 Touch 对象',[],Types.ARRAY(UDTouch)); //一 个 Touch数组 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化
    // targetTouches=createAttribute('所有当前接触触摸平面的触点的 Touch 对象',[],Types.ARRAY(UDTouch)); //一 个 Touch数组 对象，包含了如下触点的 Touch 对象：触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点。

    constructor({altKey,ctlKey,shiftKey}) {
        this.altKey({value:altKey});
        this.ctlKey({value:ctlKey});
        this.shiftKey({value:shiftKey});
    }
}
regClass(className,UDTouchEventContext)

export default UDTouchEventContext;