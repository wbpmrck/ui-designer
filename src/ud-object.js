// import {UDAttribute,createAttribute,createAttributeWithName} from "./ud-attribute"
import {regEnums,regClass,createClassObject,Types,Type,DECORATORS,field,UDAttribute} from "./ud-runtime"
import UDEvent from "./ud-event"
import UDAction from "./ud-action"


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
                new UDAttribute({name:'touchEvent',desc:'按下的手势位置',valueType:Types.CLASS(UDTouch)})
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

    
    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ARRAY('UDObject'),desc:'节点的孩子',value:[]})
    children(){};  //节点的孩子
    

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
     * 移除某个孩子
     * @param {UDObject} child 
     */
    removeChild(child){
        let index = this.indexOfChild(child);
        if(index>=0){
            this.children.splice(index,1);

            //TODO:在child身上触发“被删除”事件

            return true;
        }else{
            return false;
        }
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
    /**
     * get index of the child.-1 means not found
     * @param child 
     */
    indexOfChild(child){
        let index = -1;

        for(let i=0;i<this.children().value.length;i++){
            if(this.children().value[i]._identity().value === child._identity){
                index =  i;
                break;
            }
        }
        return index;
    }

    addChild(child){
        if(!this.canAddChild() || this.indexOfChild(child)>-1){
            return false;//the child is allready in
        }else{
            let newChildren =this.children().value.slice();
            newChildren.push(child);

            //因为 children 属性在初始化的时候，很可能value和defaultValue是同一个数组引用。直接操作value的话，会导致default也发生改变
            this.children({
                value:newChildren
            }); 
            child.parent = this;
            return true; 
        }
    }
}
regClass("UDObject",UDObject)
export default UDObject