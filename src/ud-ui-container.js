import UDUIObject from './ud-ui-object'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field} from "./ud-runtime"

const className = 'UDUIContainer'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */

@DECORATORS.serializable(true)
class UDUIContainer extends UDUIObject{
    
    static getTypeName(){
        return className
    }
    // constructor({typeName,serializedString}) {
    // constructor({serializedString}) {
    constructor() {
        super()
        // super({serializedString})
    }
    /**
     * Container容器都是可以添加子元素的
     */
    canAddChild(){
        return true; 
    }
}
regClass(className,UDUIContainer)

export default UDUIContainer;