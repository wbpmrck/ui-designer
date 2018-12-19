import UDObject from '../ud-object'
import UDEvent from '../ud-event'
import {UDAttributeUnit}  from "../enums/ud-unit"
import UDTouchEventContext from "../gesture/ud-touch-event-context"
import UDTouch from "../gesture/ud-touch"
import UDRange from "../enums/ud-range"
import UDAction from "../ud-action"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

const className = 'UDUIObject'
/**
 * 表示可以被展示和显示的界面元素对象
 */
@DECORATORS.serializable(true)
class UDUIObject extends UDObject{
    
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
            new UDEvent({name:'tap',desc:'手指/光标单击',contextParams:[]}),
            new UDEvent({name:'touchStart',desc:'手指/光标按下',contextParams:[
                new UDAttribute({name:'touchEvent',desc:'按下的手势位置',valueType:UDTouch.getType()})
            ]}),
            new UDEvent({name:'move',desc:'手指/光标移动',contextParams:[
                new UDAttribute({name:'touchEvent',desc:'移动过程中的手势信息',valueType:UDTouchEventContext.getType()})
            ]}),
            new UDEvent({name:'touchEnd',desc:'手指/光标抬起',contextParams:[
                new UDAttribute({name:'touchEvent',desc:'抬起的手势位置',valueType:UDTouch.getType()})
            ]}),
            new UDEvent({name:'swipeLeft',desc:'手指/光标向左滑动',contextParams:[]}),
            new UDEvent({name:'swipeRight',desc:'手指/光标向右滑动',contextParams:[]}),
            new UDEvent({name:'swipeUp',desc:'手指/光标向上滑动',contextParams:[]}),
            new UDEvent({name:'swipeDown',desc:'手指/光标向下滑动',contextParams:[]}),
            new UDEvent({name:'mouseEnter',desc:'光标移入',contextParams:[]}),
            new UDEvent({name:'mouseLeave',desc:'光标移出',contextParams:[]}),
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
            new UDAction({name:'show',desc:'显示对象',params:[]}),
            new UDAction({name:'hide',desc:'隐藏对象',params:[]}),
            new UDAction({name:'toggleShow',desc:'交替显示/隐藏对象',params:[]}),
            new UDAction({name:'placeZindexTop',desc:'置于顶层',params:[
                new UDAttribute({name:'range',desc:'适用范围',valueType:UDRange.getType()})
            ]}),
            new UDAction({name:'placeZindexBottom',desc:'置于底层',params:[
                new UDAttribute({name:'range',desc:'适用范围',valueType:UDRange.getType()})
            ]})
        ]);
    }

    /*
        1.位置相关
    */
    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'x坐标',value:0,unit:UDAttributeUnit.PX})
    x(){};
    
    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'y坐标',value:0,unit:UDAttributeUnit.PX})
    y(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'z轴刻度',value:0,unit:UDAttributeUnit.PX})
    z(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'宽度',value:0,unit:UDAttributeUnit.PX})
    w(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'高度',value:0,unit:UDAttributeUnit.PX})
    h(){};



    /*
        2.背景和透明度
    */

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Number.getType(),desc:'不透明度',value:100,unit:UDAttributeUnit.PERCENTAGE})
    alpha(){};

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'背景色',value:''})
    bgColor(){};



    /*
        3.3D旋转和变换
    */

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'沿水平轴旋转角度',value:0,unit:UDAttributeUnit.ANGLE})
   rotateX(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'沿垂直轴旋转角度',value:0,unit:UDAttributeUnit.ANGLE})
   rotateY(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'沿垂z轴旋转角度',value:0,unit:UDAttributeUnit.ANGLE})
   rotateZ(){};




    /*
        4.边框和阴影
    */

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'边框圆角',value:0,unit:UDAttributeUnit.PX})
   borderRadius(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:Number.getType(),desc:'边框宽度',value:0,unit:UDAttributeUnit.PX})
   borderWidth(){};

   @DECORATORS.serializable(true)
   @DECORATORS.field({type:String.getType(),desc:'边框颜色',value:''})
   borderColor(){};


    // constructor({typeName,serializedString}) {
    constructor() {
        super();
    }
}
regClass(className,UDUIObject)

export default UDUIObject;