import UDUIObject from './ud-ui-object'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

const className = 'UDImage'
/**
 * 表示可以被展示和显示的界面元素对象
 */
@DECORATORS.serializable(true)
class UDImage extends UDUIObject{
    
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
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
        ]);
    }

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'图片的资源地址',value:''})
    url(){};  //图片的资源地址
    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDImage)

export default UDImage;