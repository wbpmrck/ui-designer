import UDObject from './ud-object'
import {UDAttribute}  from "./ud-attribute"
import {regClass,createClassObject} from "./ud-runtime"

const className = 'UDUIObject'
/**
 * 表示可以被展示和显示的界面元素对象
 */
class UDUIObject extends UDObject{
    
    // constructor({typeName,serializedString}) {
    constructor({serializedString}) {
        super({serializedString})
 
        //横坐标，纵坐标，z坐标
        this.setAttribute("x",0,UDAttributeUnitEnum.px); 
        this.setAttribute("y",0,UDAttributeUnitEnum.px);
        this.setAttribute("z",0,undefined);

        //宽度，高度
        this.setAttribute("w",0,UDAttributeUnitEnum.px); 
        this.setAttribute("h",0,UDAttributeUnitEnum.px);
    }
    getTypeName(){
        return className
    }
}
regClass(className,UDUIObject)

export default UDUIObject;