
import {regEnums,regClass,createClassObject,Types} from "./ud-runtime"


/**
 * 表示一个属性值
 */
class UDAttribute{

    /**
     * 这里面的T应该都是简单类型，不要用属性去尝试保存一个对象
     */
    name ;
    value ;
    valueType; // 值的类型
    defaultValue ;
    defaultValueType ; //默认的值的类型
    unit ;
    defaultUnit ;

    setValue(val){
        if(val !== undefined){
            //todo: 后期根据 valueType 增加参数类型检查功能
            this.value = val;
        }
    }
    static deserialize(serializedString){
        if(serializedString !== undefined){
            try{
                let dataJson = JSON.parse(serializedString);
                // return new UDAttribute({
                //     name:dataJson.name,
                //     value:dataJson.value,
                //     unit:dataJson.unit
                // })
                return new UDAttribute(dataJson)
                
            }catch(e){
                return undefined;
            }
        }
    }
    // constructor({name,value,unit,defaultValue,defaultUnit,serializedString}){
    constructor({name,value,valueType,unit,defaultValue,defaultValueType,defaultUnit}){
        // 如果不是通过反序列化创建对象，则开始正常构造对象
        // if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
        //     this.deserialize(serializedString)
        // }else{
            this.name=name;
            this.value=value;
            this.valueType=valueType;
            this.defaultValue = defaultValue
            this.defaultValueType=defaultValueType;
            this.unit=unit;
            this.defaultUnit = defaultUnit
        // }
    }

    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    serialize(options){
        try{
            //如果自己当前的值等于默认值,则自己序列化输出无结果
            if(this.defaultValue===this.value && this.defaultValueType===this.valueType && this.defaultUnit === this.unit){
                return undefined
            }else{
                // return JSON.stringify({name:this.name,value:this.value,unit:this.unit,defaultValue:this.defaultValue,defaultUnit:this.defaultUnit})
                return JSON.stringify({name:this.name,value:this.value,valueType:this.valueType,unit:this.unit})
            }
        }catch(e){
            console.error(e);
            return undefined
        }
    }   
    // /**
    //  * 接收输入的序列化字符串，进行反序列化，并设置到自身属性中
    //  * @param seriallizedString 
    //  */
    // deserialize(seriallizedString){
    //     if(seriallizedString !== undefined){
    //         try{
    //             let dataJson = JSON.parse(seriallizedString);
    //             this.name = dataJson.name;
    //             this.value = dataJson.value;
    //             this.unit = dataJson.unit;
    //             // this.defaultValue = dataJson.defaultValue;
    //             // this.defaultUnit = dataJson.defaultUnit;
                
    //         }catch(e){
    //             console.error(e);
    //         }
    //     }
    // }

}

// function createAttribute(attName,defaultValue,defaultValueType,defaultUnit){
function createAttribute(defaultValue,defaultValueType,defaultUnit){
    return new UDAttribute({ 
        value:defaultValue,
        valueType:defaultValueType,
        defaultValue:defaultValue,
        defaultValueType:defaultValueType,
        unit:defaultUnit,
        defaultUnit:defaultUnit
    });
}
function createAttributeWithName(attName,defaultValue,defaultValueType,defaultUnit){
    return new UDAttribute({ 
        name:attName,
        value:defaultValue,
        valueType:defaultValueType,
        defaultValue:defaultValue,
        defaultValueType:defaultValueType,
        unit:defaultUnit,
        defaultUnit:defaultUnit
    });
}

export {UDAttribute,createAttribute,createAttributeWithName}