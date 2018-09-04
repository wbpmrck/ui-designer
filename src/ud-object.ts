import UDSerializable from "./ud-serializable"
import {UDAttribute,UDAttributeUnit} from "./ud-attribute"
import {regClass,createClassObject} from "./ud-runtime"
class UDObject extends UDSerializable {
    static identitySeed = 1;
    private _identity: string //自动化生成的唯一标识
    public id:string //允许外部指定的唯一标识
    public typeName: string //类型名称
    public parent?: UDObject //节点的父亲节点
    public children: Array<UDObject>  //节点的孩子
    public attributes : { [key: string]: UDAttribute }


    constructor({typeName,serializedString}:{typeName: string,serializedString?: string}) {
        super(serializedString);
        // 如果不是通过反序列化创建对象，则开始正常构造对象
        if(serializedString===undefined){
            this.typeName = typeName;
            this._identity = `${+new Date()}-${UDObject.identitySeed++}`;
            this.parent = undefined;
            this.attributes = {};
            this.children = new Array<UDObject>();
        }
    }


    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    serialize(options ?:any) : string{
        try{
            // //如果自己当前的值等于默认值,则自己序列化输出无结果
            // if(this.props.defaultValue===this.props.value){
            //     return ""
            // }else{
            //     return JSON.stringify({name:this.props.name,value:this.props.value,unit:this.props.unit})
            // }

            /*
                注意：
                1.序列化的时候，父节点无需序列化。因为在反序列化的时候，一定是从父亲开始反序列化，这时候我们希望子节点指向的是父节点的引用。所以是由父节点
                调用addChild来更新此字段的

            */
            let json = `{
                "_identity":"${this._identity}",
                "id":"${this.id}",
                "typeName":"${this.typeName}",
                "attributes":[${this.findAttribute((attr:UDAttribute)=>{
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
    deserialize(serializedString?: string) : void{
        if(serializedString !== undefined){
            try{
                let dataJson = JSON.parse(serializedString);
                this.id = dataJson.id;
                this._identity = dataJson._identity;
                this.typeName = dataJson.typeName;
                this.attributes = {};
                // 反序列化属性
                let attrData  = dataJson.attributes;
                attrData.forEach((attr:any)=>{
                    // this.attributes[attr.name]= new UDAttribute({name:attr.name,unit:attr.unit,value:attr.value})
                    this.attributes[attr.name]= new UDAttribute({serializedString:JSON.stringify(attr)})
                });
                // 反序列化孩子
                let childrenData = dataJson.children;
                this.children = new Array<UDObject>();
                childrenData.forEach( (element:{typeName:string}) => {
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

    addAttribute(attName:string,defaultValue:any,defaultUnit:UDAttributeUnit|undefined){
        // 如果该属性已经在了，则只修改默认值，不修改属性当前的值
        if(this.attributes.hasOwnProperty(attName)){
            this.attributes[attName].defaultValue = defaultValue
            this.attributes[attName].defaultUnit = defaultUnit
        }else{
            this.attributes[attName] = new UDAttribute({name:attName,value:defaultValue,defaultValue:defaultValue,unit:defaultUnit,defaultUnit:defaultUnit})
        }
    }
    findAttribute(filter:(attr:UDAttribute)=>boolean):UDAttribute[]{
        let ret: UDAttribute[]=[];
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
    canAddChild(child:UDObject):boolean{
        return false; 
    }

    /**
     * get index of the child.-1 means not found
     * @param child 
     */
    indexOfChild(child:UDObject){
        let index:number = -1;

        for(let i=0;i<this.children.length;i++){
            if(this.children[i]._identity === child._identity){
                index =  i;
                break;
            }
        }
        return index;
    }

    addChild(child:UDObject){
        if(this.indexOfChild(child)>-1){
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