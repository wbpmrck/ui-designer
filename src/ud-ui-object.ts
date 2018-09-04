import UDObject from './ud-object'
import {UDAttribute,UDAttributeUnit,UDAttributeUnitEnum}  from "./ud-attribute"
import {regClass,createClassObject} from "./ud-runtime"

/**
 * 表示可以被展示和显示的界面元素对象
 */
class UDUIObject extends UDObject{
    
    constructor({typeName,serializedString}:{typeName: string,serializedString?: string}) {
        super({typeName,serializedString})

        // super.addAttribute("x",0,UDAttributeUnitEnum.px);
        // super.addAttribute("y",0,UDAttributeUnitEnum.px);
        // super.addAttribute("z",0,UDAttributeUnitEnum.px);

        this.addAttribute("x",0,UDAttributeUnitEnum.px);
        this.addAttribute("y",0,UDAttributeUnitEnum.px);
        this.addAttribute("z",0,UDAttributeUnitEnum.px);
    }
}
regClass("UDUIObject",UDUIObject)

export default UDUIObject;