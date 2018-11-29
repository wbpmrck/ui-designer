import UDUIObject from './ud-ui-object'
import UDEvent from './ud-event'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "./ud-runtime"

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
    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents(){
        return super.getSupportEvents().concat([
            new UDEvent({name:'childAdded',desc:'子对象添加',contextParams:[
                new UDAttribute({name:'totalCount',desc:'当前子对象个数',valueType:Types.NUMBER})
            ]}),
            new UDEvent({name:'childDeleted',desc:'子对象删除',contextParams:[
                new UDAttribute({name:'totalCount',desc:'当前子对象个数',valueType:Types.NUMBER})
            ]}),
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
            '创建子对象(用于动态创建一个对象，并插入到自己children下面)'
        ]);
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

    /**
     * 判断该对象能否添加目标类型的实例为自己的孩子
     * @param {TypeName} targetType 
     */
    canAddChild(targetType){
        return true; 
    }
}
regClass(className,UDUIContainer)

export default UDUIContainer;