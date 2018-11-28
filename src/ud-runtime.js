
// interface Constructable<T> {
//     new() : T;
// }



let _iota=0;

function iota(){
    return _iota++;
}
const Types ={
    NUMBER:'number',
    BOOLEAN:'boolean',
    STRING:'string',
    // ARRAY:(itemType)=>{
    //     return `${itemType} []`
    // },
    /**
     * 获取表示类型的数组
     */
    ARRAY:(UDType)=>{
        return `${UDType.name} []`
    },
    MAP:(keyType,valueType)=>{
        return `<${keyType.name},${valueType.name}>`
    },
    CLASS:(UDType)=>{
        if(classDic.hasOwnProperty(UDType.name)){
            // return `CLASS<${classDic[className].name}>`;
            return UDType.name;
        }else{
            throw new Error(`class: [${UDType.name}] is not exist`) 
        }
       
    },
    //获取指定对象的类型名称
    typeof:(target)=>{
        return typeof target
    },
    // CLASS:(className)=>{
    //     if(classDic.hasOwnProperty(className)){
    //         // return `CLASS<${classDic[className].name}>`;
    //         return classDic[className].name;
    //     }else{
    //         throw new Error(`class: [${className}] is not exist`) 
    //     }
       
    // },
    // ENUM:(enumName)=>{
    //     if(enumsDic.hasOwnProperty(enumName)){
    //         return `ENUM<${enumName}>`;
    //     }else{
    //         throw new Error(`ENUM: [${enumName}] is not exist`) 
    //     }
    // },
    EMPTY:'empty', //空值
    ANY:'any', //任意类型
};

/**
 * 判断对象是否是指定类型的实例
 * @param {Any} valueTarget 
 * @param {String} className 
 */
function isInstanceOf(valueTarget,className){
    // TODO:根据className,进行细致的判断，确定valueTarget是否是指定类型的实例
    return true;
}

let classDic = {};
let enumsDic = {};

/**
 * 注册一个枚举。返回枚举对象
 * @param {String} name 
 * @param {()=>Object} keyValuePairGenerator 
 */
var regEnums = function(name ,keyValuePairGenerator){
    if(classDic.hasOwnProperty(name)){
        throw new Error(`class:[${name}] is already exist!`)
    }else{
        let keyValuePairObject= {};
        if(keyValuePairGenerator){
            keyValuePairObject=keyValuePairGenerator(iota)
        }
        if(keyValuePairObject.hasOwnProperty(name) ){
            throw new Error(`enum:[${name}] can not use 'name' as its value key!`)
        }else{
            
            // 下面创建一个临时的类构造函数，用来表示枚举类
            var _enumCons = function(){
                // this.key = undefined;
                // this.val = undefined;
            }
            _enumCons.prototype.serialize = function(){
                return this.val
            }

            /**
             * 获取枚举对象的key名
             */
            _enumCons.prototype.name = function(){
                //自动创建枚举类的每个枚举值(对象)
                for(var key in keyValuePairObject){
                    if(_enumCons[key].val===this.val){
                        return key;
                    }
                }
            }
            //自动创建枚举类的每个枚举值(对象)
            for(var key in keyValuePairObject){
                _enumCons[key]= new _enumCons();

                Object.defineProperty(_enumCons[key], "key", {
                    get : function(){
                        return key;
                    },
                    enumerable : true,
                    configurable : true
                });

                Object.defineProperty(_enumCons[key], "val", {
                    get : function(){
                        return keyValuePairObject[key];
                    },
                    enumerable : true,
                    configurable : true
                });

                // _enumCons[key].key= key;
                // _enumCons[key].val= keyValuePairObject[key];

            }


            //当根据枚举值进行
            _enumCons.parse= (val)=>{
                for(var key in keyValuePairObject){
                    if(keyValuePairObject[key]=== val){
                        return _enumCons[key];
                    }
                }
            }
    
            Object.defineProperty(_enumCons, "name", {
                get : function(){
                  return name;
                },
                enumerable : true,
                configurable : true
              });
    
            // classDic[name] = keyValuePairObject;
            classDic[name] = _enumCons;
            return _enumCons;
        }
    }
}

/**
 * 注册一个类型
 * @param typeName 
 * @param constructorFunc 
 */
var regClass = function(typeName ,constructorFunc){
    if(classDic.hasOwnProperty(typeName)){
        throw new Error(`class:[${typeName}] is already exist!`)
    }else{
        Object.defineProperty(constructorFunc, "name", {
            get : function(){
              return typeName;
            },
            enumerable : true,
            configurable : true
          });

        classDic[typeName] = constructorFunc
    }
}

/**
 * 根据给定类型，动态创建一个类型的对象
 * @param typeName
 * @param params 
 */
var createClassObject = function(typeName,...params){
    let cons = classDic[typeName];
    if(cons!==undefined && typeof cons === 'function'){
        // return cons.apply({},params)
        return new cons(...params)
    }else if(typeof cons === 'object'){
        //TODO:创建对应枚举值
    }
    else{
        return undefined
    }
    
}

//定义所有可以用来修饰类的修饰器
const DECORATORS={
    /**
     * 修饰一个属性/方法，使得其只读
     */
    readonly:(target, name, descriptor)=>{
        // descriptor对象原来的值如下
        // {
        //   value: specifiedFunction,
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        descriptor.writable = false;
        return descriptor;
    },
    /**
     * 修饰类/属性，使其可以序列化
     */
    serializable:(canSerialize)=>{
        if(canSerialize===undefined){
            canSerialize = true; //默认是可以序列化的
        }
        return (target,name,descriptor)=>{
            //如果修饰的是类
            if(typeof target === 'function'){
                target.__ud_serializable__ = canSerialize; //给类的构造函数添加一个标记，表示这个类是否可以序列化
            }else if(typeof target === 'object' && descriptor && descriptor.value !== undefined){
                //如果修饰的是属性访问器方法
                descriptor.value.__ud_serializable__ = canSerialize;
                // return target;

            }
        }
    },
    /**
     * 
     * 修饰字段，把它包装成一个属性
     */
    field:({type,desc,value,unit})=>{
        if(type===undefined){
            throw new Error('missing filed type!')
        }
        return (target, key, descriptor)=>{
            //如果修饰的是类
            if(typeof target === 'function'){
                throw new Error('field decorator can not use on Class!')
            }else{
                // TODO:约定必须用在函数上，然后自动把这个函数编程类似KO.observable()的使用方式，可以直接set,get值
                //如果修饰的是非函数的类成员属性
                // if(typeof descriptor.value.constructor !== 'function'){\

                let valueType = Types.typeof(value);
                let propertyName = `__ud_attribute_${key}__`;

                //替换函数声明为一个可空参数的“存取器”
                /**
                 * option={value,unit}
                 */
                // descriptor.enumerable = false;//不可被枚举遍历，从而提高序列化性能(如果存取器一直没被调用过，那么说明这个值肯定保持的是原始值，那么压根也没必要序列化，TODO:如果想要无视序列化的效能，则可以注释这一行)
                descriptor.enumerable = true;//序列化的时候，只可以序列化访问器
                descriptor.value = function(option){
                    //当存取器执行的时候，先初始化参数
                    if(this[propertyName] === undefined){
                        Object.defineProperty(this, propertyName, {
                            enumerable: false,
                            configurable: false,
                            writable: false,
                            value: new UDAttribute({name:key,desc,value,valueType:valueType,unit,defaultValue:value,defaultValueType:type,defaultUnit:unit})
                        });
  
                        // this[propertyName]= new UDAttribute({name:key,desc,value,valueType:valueType,unit,defaultValue:value,defaultValueType:type,defaultUnit:unit})
                    }
                    //取值
                    if(option === undefined){
                        return {
                            value:this[propertyName].value,
                            desc:this[propertyName].desc,
                            unit:this[propertyName].unit
                        }
                    }else if(typeof option ==='object'){
                        //设置值
                        if(option.value !== undefined){
                            this[propertyName].setValue(option.value)
                        }
                        //设置单位
                        if(option.unit !== undefined){
                            this[propertyName].setUnit(option.unit)
                        }
                    }
                };
                descriptor.value.__ud_attribute__ = true; //标识这是一个属性存取器
                // }
            }
            return descriptor;
            // return target;
        }
    },
}

/**
 * 注意：在ui-designer里，所有编辑器模式下的类型信息，其字段都应该是Attribute类的实例，哪怕是一个整数，也必须如此
 * 1、对于需要序列化的对象，查看其有无__ud_serializable__==true,有的话才对其进行序列化
 * 2、具体序列化的时候，检查对象上有自定义方法：serialize,则在序列化这个对象的时候，直接调用该方法进行序列化。否则，遍历他的每个字段，对所有的Attribute进行序列化
 * @param {Object} targetObject 
 */
var serialize = function(targetObject){

    //暂存序列化结果的缓冲区
    let resultBuffer=[];

    //移除字符缓冲区里末尾的,号，主要用于拼接JSON的时候处理最后一个key的情况
    function _removeTailComma(){
        if(resultBuffer[resultBuffer.length-1]===','){
            resultBuffer.pop();
        }
    }
    function _appendKeyValue(key,val){
        if(key !== undefined){
            resultBuffer.push(`"${key}":${val}`); 
        }else{
            resultBuffer.push(`${val}`); 
        }
        resultBuffer.push(','); 
    }

    //对一个对象进行序列化
    let _serializeData = function(key,target,parent){

        switch(typeof target){
            case 'string':
                _appendKeyValue(key,`"${target.toString()}"`)
                // resultBuffer.push('"'+target.toString()+'"'); //字符串在JSON中需要补齐双引号
                
                break;
            case 'number':
            case 'boolean':
                _appendKeyValue(key,target.toString())//非字符串类型不需双引号
                // resultBuffer.push(`"${key}":${target.toString()}`); 
                break;
            case 'undefined':
                //undefined不需要序列化
                break;
            case 'function':
                //如果是属性访问器,且是可序列化的，则取里面的属性进行序列化
                if(target.__ud_attribute__ && target.__ud_serializable__){
                    // let attr = parent[key]();

                    let propertyName = `__ud_attribute_${key}__`;
                    let attrVal = parent[propertyName].serialize();

                    if(attrVal!== undefined){
                        _appendKeyValue(key,attrVal);
                    }
                    
                }
                break;
            case 'object':
                //对象的情况:
                //对象非null
                if(target!==null){
                    //对于日期类型
                    if(target.constructor === Date){
                        resultBuffer.push(JSON.stringify(target));
                    }else if(target.constructor===Array){
                        resultBuffer.push('[');
                        //如果字段是数组，则分别进行序列化
                        for(var index=0;index<target.length;index++){
                            _serializeData(undefined,target[index],undefined);
                            resultBuffer.push(',');
                        }
                        _removeTailComma();
                        resultBuffer.push(']');
                    }
                    else{
                        //如果是其他对象类型
                        //首先，查看类型本身是否允许序列化
                        if(target.constructor.__ud_serializable__){
                            //检查是否有自定义的序列化方法
                            if(target.constructor.prototype.hasOwnProperty('serialize')){
                                _appendKeyValue(key,target.serialize())
                            }else{
                                resultBuffer.push('{');
                                //如果没有该方法，则尝试自动序列化。
                                //遍历其中的每个字段，对其进行序列化
                                for(var fieldName in target){
                                    let fieldOfTarget = target[fieldName];
                                    _serializeData(fieldName,fieldOfTarget,target);
                                }
                                _removeTailComma();
                                resultBuffer.push('}');
                            }
                        }
                    }


                }else{
                    //对象是null
                    _appendKeyValue(key,'null')
                    // resultBuffer.push('null');
                }
                break;
        }
    }

    //开始序列化
    _serializeData(undefined,targetObject,undefined);
    return resultBuffer.join('')
}

/**
 * 反序列化
 * 
 * 注意：
 * 1、所有类型，构造函数都必须支持 serializedString 作为参数
 * @param {Object} targetObject 
 */
var deserialize = function(targetObject){

    let _deserializeData = function(target){
        
    }

    return _deserializeData(targetObject);
}



/**
 * 表示一个属性值
 */
class UDAttribute{

    /**
     * 这里面的T应该都是简单类型，不要用属性去尝试保存一个对象
     */
    name ;
    desc ;
    value ;
    valueType; // 值的类型
    defaultValue ;
    defaultValueType ; //默认的值的类型
    unit ;
    defaultUnit ;

    setValue(val){
        if(val !== undefined){
            //TODO: 后期根据 valueType 增加参数类型检查功能
            this.value = val;
        }
        return this;
    }
    setUnit(unit){
        if(unit !== undefined){
            //TODO: 后期根据 valueType 增加参数类型检查功能
            this.unit = unit;
        }
        return this;
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
    constructor({name,desc,value,valueType,unit,defaultValue,defaultValueType,defaultUnit}){
        // 如果不是通过反序列化创建对象，则开始正常构造对象
        // if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
        //     this.deserialize(serializedString)
        // }else{
            this.name=name;
            this.desc=desc;
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
            }
            let result =[];
            if(this.defaultValue!==this.value){
                result.push(`"value":${JSON.stringify(this.value)}`);
            }
            if(this.defaultValueType!==this.valueType){
                result.push(`"valueType":${JSON.stringify(this.valueType)}`);
            }
            if(this.defaultUnit!==this.unit){
                result.push(`"unit":${JSON.stringify(this.unit)}`);
            }
            return `{${result.join(',')}}`


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

export {regClass,regEnums,createClassObject,Types,isInstanceOf,DECORATORS,field,serialize}