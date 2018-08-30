import UDSerializable from "./ud-serializable"

enum UDAttributeType {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}


/**
 * 属性单位类型
 */
// enum UDAttributeUnit {
//     PX="px",
//     Percentage="%",
//     Angle="°",
// }
type UDAttributeUnit = "px"|"percentage"|"angle"|"none"

/**
 * 表示一个属性值
 */
class UDAttribute<T> extends UDSerializable{

    /**
     * 这里面的T应该都是简单类型，不要用属性去尝试保存一个对象
     */
    props:{
        name : string
        value : T|undefined
        unit : UDAttributeUnit|undefined
        defaultValue : T
    }

    constructor({name,value,unit,defaultValue,serializedString}:{name?:string,value?:T,unit ?: UDAttributeUnit,defaultValue : T,serializedString?:string}){
        super(serializedString);

        //如果不是反序列化方式创建对象，则赋值默认值
        if(this.props===undefined){
            this.props={
                name:name,
                value:value,
                unit:unit,
                defaultValue:defaultValue
            }
        }else{
            this.props.defaultValue = defaultValue
        }
    }

    // constructor({name,value,unit,defaultValue,serializedString}:{name:string,value:T,unit : UDAttributeUnit|undefined,defaultValue : T,serializedString?:string}){
        
    //     super(serializedString);

    //     // 只有当不是反序列化方式创建对象的时候，才设置自身属性
    //     if(serializedString===undefined){
    //         this.props.name = name;
    //         this.props.value = value;
    //         this.props.unit = unit;
    //     }
    //     //默认值不会序列化， 仍然是从构造函数中取
    //     this.props.defaultValue = defaultValue
    // }

    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    serialize(options ?:any) : string{
        try{
            //如果自己当前的值等于默认值,则自己序列化输出无结果
            if(this.props.defaultValue===this.props.value){
                return ""
            }else{
                return JSON.stringify({name:this.props.name,value:this.props.value,unit:this.props.unit})
            }
        }catch(e){
            console.error(e);
            return ""
        }
    }   
    /**
     * 接收输入的序列化字符串，进行反序列化，并设置到自身属性中
     * @param seriallizedString 
     */
    deserialize(seriallizedString?: string) : void{
        if(seriallizedString !== undefined){
            try{
                let dataJson = JSON.parse(seriallizedString);
                this.props= {
                    name : dataJson.name,
                    value : dataJson.value,
                    unit : dataJson.unit,
                    defaultValue:undefined
                }
            }catch(e){
                console.error(e);
            }
        }
    }

}

export {UDAttribute,UDAttributeUnit}