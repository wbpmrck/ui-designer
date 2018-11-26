import UDObject from './ud-object'
import UDEvent from './ud-event'
import {UDAttribute,createAttribute,createAttributeWithName}  from "./ud-attribute"
import {UDAttributeUnit}  from "./ud-unit"
import UDTouchEventContext from "./gesture/ud-touch-event-context"
import {regClass,createClassObject,Types} from "./ud-runtime"

const className = 'UDUIObject'
/**
 * 表示可以被展示和显示的界面元素对象
 */
class UDUIObject extends UDObject{
    
    // constructor({typeName,serializedString}) {
    constructor({serializedString}) {
        super({serializedString})
 
        //横坐标，纵坐标，z坐标
        this.setAttribute("x","x坐标",0,Types.NUMBER,UDAttributeUnit.PX); 
        this.setAttribute("y","y坐标",0,Types.NUMBER,UDAttributeUnit.PX); 
        this.setAttribute("z","z轴刻度",0,Types.NUMBER,UDAttributeUnit.PX); 

        //宽度，高度
        this.setAttribute("w","宽度",0,Types.NUMBER,UDAttributeUnit.PX); 
        this.setAttribute("h","高度",0,Types.NUMBER,UDAttributeUnit.PX); 

        this.events =[
            new UDEvent({name:'touch-start',desc:'手指按下',contextParams:[
                createAttributeWithName('','',0,Types.NUMBER,UDAttributeUnit.PX)
                // new UDAttribute({
                //     name:'',
                //     desc,
                //     value,
                //     valueType,
                //     unit,
                //     defaultValue,
                //     defaultValueType,
                //     defaultUnit
                // })
            ]})
        ]
    }
    getTypeName(){
        return className
    }
}
regClass(className,UDUIObject)

export default UDUIObject;