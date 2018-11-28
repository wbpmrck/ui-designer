import UDObject from './ud-object'
import UDEvent from './ud-event'
import {UDAttributeUnit}  from "./ud-unit"
import UDTouchEventContext from "./gesture/ud-touch-event-context"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field} from "./ud-runtime"

const className = 'UDUIObject'
/**
 * 表示可以被展示和显示的界面元素对象
 */
class UDUIObject extends UDObject{
    
    static getTypeName(){
        return className
    }
    
    @DECORATORS.field({type:Types.NUMBER,desc:'x坐标',value:0,unit:UDAttributeUnit.PX})
    x;
    
    @DECORATORS.field({type:Types.NUMBER,desc:'y坐标',value:0,unit:UDAttributeUnit.PX})
    y;
    @DECORATORS.field({type:Types.NUMBER,desc:'z轴刻度',value:0,unit:UDAttributeUnit.PX})
    z;
    @DECORATORS.field({type:Types.NUMBER,desc:'宽度',value:0,unit:UDAttributeUnit.PX})
    w;
    @DECORATORS.field({type:Types.NUMBER,desc:'高度',value:0,unit:UDAttributeUnit.PX})
    h;
    // constructor({typeName,serializedString}) {
    constructor({serializedString}) {
        super({serializedString})
 
        // //横坐标，纵坐标，z坐标
        // this.setAttribute("x","x坐标",0,Types.NUMBER,UDAttributeUnit.PX); 
        // this.setAttribute("y","y坐标",0,Types.NUMBER,UDAttributeUnit.PX); 
        // this.setAttribute("z","z轴刻度",0,Types.NUMBER,UDAttributeUnit.PX); 

        // //宽度，高度
        // this.setAttribute("w","宽度",0,Types.NUMBER,UDAttributeUnit.PX); 
        // this.setAttribute("h","高度",0,Types.NUMBER,UDAttributeUnit.PX); 

        this.events =[
            // new UDEvent({name:'touch-start',desc:'手指按下',contextParams:[
            //     createAttributeWithName('','',0,Types.NUMBER,UDAttributeUnit.PX)
            //     // new UDAttribute({
            //     //     name:'',
            //     //     desc,
            //     //     value,
            //     //     valueType,
            //     //     unit,
            //     //     defaultValue,
            //     //     defaultValueType,
            //     //     defaultUnit
            //     // })
            // ]})
        ]
    }
}
regClass(className,UDUIObject)

export default UDUIObject;