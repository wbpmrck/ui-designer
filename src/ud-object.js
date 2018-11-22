import {UDAttribute,createAttribute,createAttributeWithName} from "./ud-attribute"
import {regClass,createClassObject} from "./ud-runtime"
class UDObject {
    static identitySeed = 1;
    _identity; //自动化生成的唯一标识
    id;//允许外部指定的唯一标识
    // typeName; //类型名称
    parent; //节点的父亲节点
    children;  //节点的孩子
    attributes; //具有的属性
    
    actions; //对象具有的操作
    events; // 对象会抛出的事件


    // static deserialize(serializedString){
    //     if(serializedString !== undefined){
    //         try{
    //             let dataJson = JSON.parse(serializedString);
    //             return new UDAttribute({
    //                 name:dataJson.name,
    //                 value:dataJson.value,
    //                 unit:dataJson.unit
    //             })
                
    //         }catch(e){
    //             return undefined;
    //         }
    //     }
    // }
    // constructor({typeName,serializedString}) {
    constructor({serializedString}) {
    // constructor() {
        // 如果不是通过反序列化创建对象，则开始正常构造对象
        if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
            this.deserialize(serializedString)
        }else{
            // this.typeName = typeName;
            this._identity = `${+new Date()}-${UDObject.identitySeed++}`;
            this.parent = undefined;
            this.attributes = {};
            this.children = [];
            this.actions = [];
            this.events = [];
        }
    }


    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    serialize(options){
        try{
           
            /*
                注意：
                1.序列化的时候，父节点无需序列化。因为在反序列化的时候，一定是从父亲开始反序列化，这时候我们希望子节点指向的是父节点的引用。所以是由父节点
                调用addChild来更新此字段的

            */
            // let json = `{
            //     "_identity":"${this._identity}",
            //     "id":"${this.id}",
            //     "typeName":"${this.typeName}",
            //     "attributes":[${this.findAttribute((attr)=>{
            //         return attr.value!==attr.defaultValue || attr.unit!==attr.defaultUnit
            //     }).map((attr)=>{
            //         return attr.serialize(options)
            //     }).join(",")}],
            //     "children":[${this.children.map((child)=>{
            //         return child.serialize(options)
            //     }).join(",")}]
            // }`;

            let json = `{
                "_identity":"${this._identity}",
                ${this.id===undefined?'':'"id":"'+this.id+'}",'}
                "typeName":"${this.getTypeName()}",
                "attributes":[${this.findAttribute((attr)=>{
                    return attr.value!==attr.defaultValue || attr.unit!==attr.defaultUnit
                }).map((attr)=>{
                    return attr.serialize(options)
                }).join(",")}],
                "children":[${this.children.map((child)=>{
                    return child.serialize(options)
                }).join(",")}]
            }`


                return json;
            
        }catch(e){
            console.error(e);
            return ""
        }
    }
    /**
     * 接收输入的序列化字符串，进行反序列化，并设置到自身属性中
     * @param seriallizedString 
     */
    deserialize(serializedString){
        if(serializedString !== undefined){
            try{
                let dataJson = JSON.parse(serializedString);
                this.id = dataJson.id;
                this._identity = dataJson._identity;
                // this.typeName = dataJson.typeName;
                this.attributes = {};
                // 反序列化属性
                let attrData  = dataJson.attributes;
                attrData.forEach((attr)=>{
                    // this.attributes[attr.name]= new UDAttribute({name:attr.name,unit:attr.unit,value:attr.value})
                    // this.attributes[attr.name]= new UDAttribute({serializedString:JSON.stringify(attr)})
                    this.attributes[attr.name]= UDAttribute.deserialize(JSON.stringify(attr))
                });
                // 反序列化孩子
                let childrenData = dataJson.children;
                this.children = [];
                childrenData.forEach( (element) => {
                    // let  child =new UDObject({serializedString:JSON.stringify(element),typeName:element.typeName});
                    let  child =createClassObject(element.typeName,{serializedString:JSON.stringify(element),typeName:element.typeName});
                    this.addChild(child);
                });


                // this.props= {
                //     name : dataJson.name,
                //     value : dataJson.value,
                //     unit : dataJson.unit,
                //     defaultValue:undefined
                // }
            }catch(e){
                console.error(e);
            }
        }
    }

    /**
     * 设置属性以及默认值
     * @param {String} attName 
     * @param {any} defaultValue 
     * @param {Enums} defaultUnit 
     */
    setAttribute(attName,defaultValue,defaultValueType,defaultUnit){
        // 如果该属性已经在了，则只修改默认值，不修改属性当前的值
        if(this.attributes.hasOwnProperty(attName)){
            this.attributes[attName].defaultValue = defaultValue
            this.attributes[attName].defaultValueType = defaultValueType
            this.attributes[attName].defaultUnit = defaultUnit
        }else{
            this.attributes[attName] = createAttributeWithName(attName,defaultValue,defaultValueType,defaultUnit)
        }
    }
    findAttribute(filter){
        let ret=[];
        Object.keys(this.attributes).forEach((attName)=>{
            if(filter(this.attributes[attName])){
                ret.push(this.attributes[attName])
            }
        })
        return ret;
    }
    /**
     * can you add an child to this object
     * Tips:you should override this method in sub class
     * @param child 
     */
    canAddChild(){
        return false; 
    }
    /**
     * 子类必须实现这个方法，从而支持将类型信息序列化和反序列化
     */
    getTypeName(){
        throw new Exception('sub class did not implement the [getTypeName] method!')
    }
    /**
     * 获取该类支持的事件类型。
     * 
     * 定义了一个类型支持的事件，从而可以允许可视化编辑器辅助用户进行相关配置
     */
    getSupportEvents(){
        return [];
    }

    /**
     * get index of the child.-1 means not found
     * @param child 
     */
    indexOfChild(child){
        let index = -1;

        for(let i=0;i<this.children.length;i++){
            if(this.children[i]._identity === child._identity){
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
            this.children.push(child);
            child.parent = this;
            return true; 
        }
    }
}
regClass("UDObject",UDObject)
export default UDObject