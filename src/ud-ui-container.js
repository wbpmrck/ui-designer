import UDUIObject from './ud-ui-object'
import {UDAttribute,UDAttributeUnit,UDAttributeUnitEnum}  from "./ud-attribute"
import {regClass,createClassObject} from "./ud-runtime"

const className = 'UDUIContainer'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
class UDUIContainer extends UDUIObject{
    
    // constructor({typeName,serializedString}) {
    constructor({serializedString}) {
        super({serializedString})
 
     
    }
    /**
     * Container容器都是可以添加子元素的
     */
    canAddChild(){
        return true; 
    }
    getTypeName(){
        return className
    }

}
regClass(className,UDUIContainer)

export default UDUIContainer;