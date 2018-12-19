import UDUIObject from '../ui/ud-ui-object'
import UDEvent from '../ud-event'
import UDObject from "../ud-object"
import UDAction from "../ud-action"
import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "../ud-runtime"

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
                new UDAttribute({name:'totalCount',desc:'当前子对象个数',valueType:Number.getType()})
            ]}),
            new UDEvent({name:'childDeleted',desc:'子对象删除',contextParams:[
                new UDAttribute({name:'totalCount',desc:'当前子对象个数',valueType:Number.getType()})
            ]}),
        ]);
    }

    /**
     * 获取该对象支持的行为
     */
    static getSupportActions(){
        return super.getSupportActions().concat([
            new UDAction({name:'addChild',desc:'创建子对象(用于动态创建一个对象，并插入到自己children下面)',params:[
                new UDAttribute({name:'child',desc:'子对象',valueType:UDObject.getType()})
            ]}),
            new UDAction({name:'hideChildren',desc:'隐藏子对象',params:[
                new UDAttribute({name:'except',desc:'排除以下子对象',valueType:Types.ARRAY(UDObject.getType())})
            ]}),
        ]);
    }
    

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ARRAY('UDObject'),desc:'节点的孩子',value:[]})
    children(){};  //节点的孩子
    

    // constructor({typeName,serializedString}) {
    // constructor({serializedString}) {
    constructor() {
        super()
        // super({serializedString})
    }

    /**
     * 判断该对象能否添加目标类型的实例为自己的孩子
     * @param {TypeName} targetType 
     */
    canAddChild(targetType){
        return true; 
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
            child.parent = undefined;

            return true;
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
            if(this.children().value[i]._id().value === child._id){
                index =  i;
                break;
            }
        }
        return index;
    }

    addChild(child){
        if(!this.canAddChild(child.constructor.getType()) || this.indexOfChild(child)>-1){
            return false;//the child is allready in
        }else{

            //如果孩子已经有父亲，则先从原父亲那移除
            if(child.parent){
                child.parent.removeChild(child);
            }

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
regClass(className,UDUIContainer)

export default UDUIContainer;