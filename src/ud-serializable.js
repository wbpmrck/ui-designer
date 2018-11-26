import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"

const className = 'UDSerializable'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
class UDSerializable{
    

    constructor() {
    }
    serialize(){
        return undefined;
    }
}
regClass(className,UDSerializable)

export default UDSerializable;