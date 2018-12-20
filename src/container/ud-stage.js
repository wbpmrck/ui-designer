import UDContainer from './ud-container'
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"
import {UDAttributeUnit} from '../enums/ud-unit'

const className = 'UDStage'
/**
 * 表示可以被展示和显示的界面元素对象
 */
@DECORATORS.serializable(true)
class UDStage extends UDContainer{
    
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
            new UDEvent({name:'deviceRotate',desc:'设备旋转',contextParams:[
                new UDAttribute({name:'angle',desc:'旋转角度',valueType:Number.getType(),unit:UDAttributeUnit.ANGLE})
            ]}),
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
        ]);
    }

    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDStage)

export default UDStage;