// import {UDAttribute,createAttribute,createAttributeWithName} from "./ud-attribute"
import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute} from "./ud-runtime"
import UDEvent from "./ud-event"
import UDAction from "./ud-action"
import UDTouch from "./gesture/ud-touch"


@DECORATORS.serializable(true)
class UDObject {
    /**
     * 子类必须实现这个方法，从而支持将类型信息序列化和反序列化
     */
    static getTypeName(){
        return 'UDObject'
    }
    static identitySeed = 1;

    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    static getSupportEvents(){
        return [
            new UDEvent({name:'deleted',desc:'被删除',contextParams:[]})
        ];
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return [
            new UDAction({name:'setAttr',desc:'设置属性',params:[
                new UDAttribute({name:'attributesArray',desc:'要设置的属性列表',valueType:Types.ARRAY(UDAttribute.getType())})
            ]}),
            new UDAction({name:'delete',desc:'删除对象',params:[
                new UDAttribute({name:'objectId',desc:'对象标识',valueType:Types.UDObjectID})
            ]})
        ];
    }


    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'自动化生成的唯一标识',value:''})
    // _identity; //自动化生成的唯一标识
    _identity(){}; //自动化生成的唯一标识


    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'允许外部指定的唯一标识',value:''})
    id(){};//允许外部指定的唯一标识

    parent; //节点的父亲节点

    
    

    // constructor({serializedString}) {
    constructor() {
        // // 如果不是通过反序列化创建对象，则开始正常构造对象
        // if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
        //     this.deserialize(serializedString)
        // }else{
            // this.typeName = typeName;
            this._identity({value:`${+new Date()}-${UDObject.identitySeed++}`});
            this.parent = undefined;
        // }
    }

    /**
     * 判断该对象能否添加目标类型的实例为自己的孩子
     * @param {TypeName} targetType 
     */
    canAddChild(targetType){
        return false; 
    }

    /**
     * 从应用中删除自身
     */
    delete(){
        if(this.parent){
            return this.parent.removeChild(this);
        }else{
            return false;
        }
    }
}
regClass("UDObject",UDObject)
export default UDObject