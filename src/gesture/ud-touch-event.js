import {UDAttribute,createAttribute}  from "../ud-attribute"
import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"

import {AttributeUnit}  from "../ud-unit"

const className = 'UDTouchEvent'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
class UDTouchEvent{
    
    altKey=createAttribute(false,Types.BOOLEAN,AttributeUnit.NONE); //键盘 alt 键是否被按下
    ctlKey=createAttribute(false,Types.BOOLEAN,AttributeUnit.NONE); //键盘 ctl 键是否被按下
    shiftKey=createAttribute(false,Types.BOOLEAN,AttributeUnit.NONE); //键盘 shift 键是否被按下

    touches=createAttribute([],Types.ARRAY(Types.CLASS('UDTouch')),AttributeUnit.NONE); //键盘 shift 键是否被按下

    constructor({altKey,ctlKey,shiftKey}) {
        this.altKey.setValue(altKey);
        this.ctlKey.setValue(ctlKey);
        this.shiftKey.setValue(shiftKey);
    }
}
regClass(className,UDTouchEvent)

export default UDTouchEvent;