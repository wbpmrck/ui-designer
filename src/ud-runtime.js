
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
        if(typeof UDType === 'function'){ 
            return `${UDType.name} []`
        }else if(typeof UDType === 'string'){ 
            return `${UDType} []`
        }
    },
    MAP:(keyType,valueType)=>{
        return `<${typeof keyType === 'function'?keyType.name:keyType},${typeof valueType === 'function'?valueType.name:valueType}>`
    },
    CLASS:(UDType)=>{
        if(classDic.hasOwnProperty(UDType.name)){
            // return `CLASS<${classDic[className].name}>`;
            return UDType.name;
        }else if(typeof UDType === 'string'){ 
            //对于一些在decorator里指定自身类型的情况，不要求传入类型的构造函数（因为编译会报错），直接传入类型名称
            return UDType;
        }
        else{
            throw new Error(`class: [${UDType.name}] is not exist`) 
        }
       
    },
    //获取指定对象的类型名称
    typeof:(target)=>{

        let t = typeof target; 
        let result = undefined;
        
        switch(t){
            // switch(Types.typeof(target)){
                case 'string':
                case 'number':
                case 'boolean':
                    result = t;
                    break;
                case 'undefined':
                    result = Types.EMPTY;
                    break;
                case 'function':
                    result = Types.FUNCTION; //正常来说，target应该是一个对象实例，如果传入函数，则直接返回function FIXME:此处有可能以后存在不妥，暂时没发现什么问题
                    break;
                case 'object':
                    //对象的情况:
                    //对象非null
                    if(target!==null){
                        //对数组类型
                        if(target.constructor===Array){
                           //TODO:这里以数组的第一个元素的类型为准，但是如果数组的不同元素是不同的类型，那么也就无法根据数据本身来得到其实际的类型了
                            result = Types.ARRAY(Types.typeof(target[0]));
                        }
                        //如果类型实现了静态方法来获取类型名称，则直接获取
                        else if(target.constructor.getTypeName){
                            //如果是其他对象类型
                            result = target.constructor.getTypeName();
                        }else{
                            //否则直接去构造函数名称，但是可能存在兼容性问题
                            result = target.constructor.name;
                        }
                    }else{
                        //对象是null
                      result = Types.EMPTY;
                    }
                    break;
            }

        return result;
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
    FUNCTION:'function', //函数
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
        console.log(`field [declare]: type=${type}, desc=${desc}`)
        if(type===undefined){
            throw new Error('missing filed type!')
        }
        return (target, key, descriptor)=>{
            console.log(`field [execute]: key=${key}`)
            //如果修饰的是类
            if(typeof target === 'function'){
                throw new Error('field decorator can not use on Class!')
            }else{
                // TODO:约定必须用在函数上，然后自动把这个函数编程类似KO.observable()的使用方式，可以直接set,get值
                //如果修饰的是非函数的类成员属性
                // if(typeof descriptor.value.constructor !== 'function'){\

                let valueType = Types.typeof(value); // TODO:这里是希望能够获取实际设置的初始值的类型，来初始化属性的ValueType,但是这里如果是一个空数组的话，实际类型是获取不到的，所以暂时不使用
                let propertyName = `__ud_attribute_${key}__`;

                //替换函数声明为一个可空参数的“存取器”
                /**
                 * option={value,unit}
                 */
                // descriptor.enumerable = false;//不可被枚举遍历，从而提高序列化性能(如果存取器一直没被调用过，那么说明这个值肯定保持的是原始值，那么压根也没必要序列化，TODO:如果想要无视序列化的效能，则可以注释这一行)
                descriptor.enumerable = true;//序列化的时候，只可以序列化访问器
                descriptor.value = function(option){
                    console.log(`field [call]: key=${key}`)
                    //当存取器执行的时候，先初始化参数
                    if(this[propertyName] === undefined){
                        console.log(`初始化存取器: key=${key}`)
                        Object.defineProperty(this, propertyName, {
                            enumerable: false,
                            configurable: false,
                            writable: false,
                            // value: new UDAttribute({name:key,desc,value,valueType:valueType,unit,defaultValue:value,defaultValueType:type,defaultUnit:unit})
                            value: new UDAttribute({name:key,desc,value,valueType:type,unit,defaultValue:value,defaultValueType:type,defaultUnit:unit})
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
 * 在ui-designer里，所有编辑器模式下的类型信息，其字段都应该是Attribute类的实例，哪怕是一个整数，也必须如此
 * 1、对于需要序列化的对象，查看其有无__ud_serializable__==true,有的话才对其进行序列化
 * 2、具体序列化的时候，检查对象上有自定义方法：serialize,则在序列化这个对象的时候，直接调用该方法进行序列化。否则，遍历他的每个字段，对所有的Attribute进行序列化
 * 
 * PS:
 * 1、TODO:序列化的时候，当前是把每个对象类型的类型信息，都附带在了序列化结果里。其实还可以再优化：如果发现某个属性里的实际元素的类型，和这个属性声明的类型不完全一致，则需要在序列化结果中，保存类型信息。否则的话，则不保存类型信息
 * @param {Object} targetObject 
 */
var serialize = function(targetObject,callCount){
    //FIXME:L如果一次序列化超过2w次递归调用，则认为是死循环导致的(这个参数可能过小，后续根据情况设置)
    // callCount = callCount=== undefined? 0:callCount;

    // if(callCount++ >20* 1000){
    //     throw new Error('serialization to complicate,perhaps loop reference exist!please check your object relationship!!')
    // }
    //暂存序列化结果的缓冲区
    let resultBuffer=[];

    //移除字符缓冲区里末尾的,号，主要用于拼接JSON的时候处理最后一个key的情况
    function _removeTailComma(){
        if(resultBuffer[resultBuffer.length-1]===','){
            resultBuffer.pop();
        }
    }

    //把一个对象里的key,value写入，并添加一个逗号
    function _appendKeyValue(key,val){
        if(key !== undefined){
            resultBuffer.push(`"${key}":${val}`); 
        }else{
            resultBuffer.push(`${val}`); 
        }
        resultBuffer.push(','); 
    }

    /**
     * 对一个对象进行序列化
     * @param {String} key ：对象在持有者内部的属性名
     * @param {Object} target :要序列化的对象
     * @param {Object} parent :对象的持有者
     * @param {String} targetTypeDeclared :该target在父亲类型中被定义声明的类型
     */
    let _serializeData = function(key,target,parent,targetTypeDeclared){

        console.log(`serialize:[${key}] `)

        switch(typeof target){
        // switch(Types.typeof(target)){
            case 'string':
                _appendKeyValue(key,`"${target.toString()}"`)
                if(parent===undefined){
                    _removeTailComma();
                }
                // resultBuffer.push('"'+target.toString()+'"'); //字符串在JSON中需要补齐双引号
                
                break;
            case 'number':
            case 'boolean':
                _appendKeyValue(key,target.toString())//非字符串类型不需双引号
                if(parent===undefined){
                    _removeTailComma();
                }
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

                    //因为 field decorator 会在存取器第一次调用的时候，才能拿到实例引用，从而在实例内部注入attribute，所以了能存在undefined的情况 ，此时无需进行序列化
                    if(parent[propertyName] !== undefined){

                        let attrVal = parent[propertyName].serialize();

                        if(attrVal!== undefined){
                            _appendKeyValue(key,attrVal);
                            if(parent===undefined){
                                _removeTailComma();
                            }
                        }
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
                    }else if(target.constructor===Array &&parent===undefined  ){ // 如果有parent，则只有存取器、简单类型才可以参与序列化，复杂类型全部要走存取器来定义

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
                        //如果没有持有对象，则看类型本身是否允许序列化()。如果有持有对象，则需要序列化的字段不应该是object，二应该是存取器function
                        if( target.constructor.__ud_serializable__&&parent===undefined ){
                            //检查是否有自定义的序列化方法
                            if(target.constructor.prototype.hasOwnProperty('serialize')){
                                let temp = JSON.parse(target.serialize());
                                temp.__ud_class_name__ = Types.typeof(target);
                                _appendKeyValue(key,JSON.stringify(temp));
                                if(parent===undefined){
                                    _removeTailComma();
                                }
                            }else{
                                resultBuffer.push('{');
                                //如果没有该方法，则尝试自动序列化。
                                //遍历其中的每个字段，对其进行序列化
                                for(var fieldName in target){
                                    let fieldOfTarget = target[fieldName];
                                    _serializeData(fieldName,fieldOfTarget,target);
                                }
                                _appendKeyValue('__ud_class_name__',`"${Types.typeof(target)}"`);
                                _removeTailComma();
                                resultBuffer.push('}');
                            }
                        }else{
                            console.log('no need to serialize')
                        }
                    }


                }else{
                    //对象是null
                    _appendKeyValue(key,'null')
                    if(parent===undefined){
                        _removeTailComma();
                    }
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
 * TODO:反序列化
 * 
 * 1、直接根据序列化信息内自带的类型信息来进行反序列化（每个复杂对象的序列化结果一定要自包含类型信息）
 * TODO:还可以优化，支持传入指定类型信息，则序列化的结果就可以不包含类型信息。反序列化的时候，需要根据上一层已经反序列化出的类型信息，来查看内部字段的类型，并进行反序列化（查找对应的构造函数，来创建对象）
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
            //TODO:如果只有值不同，则序列化结果更加可以简化为去掉value: 但是，要注意这种情况下，反序列化的处理
            //如果自己当前的值等于默认值,则自己序列化输出无结果
            if(this.defaultValue===this.value && this.defaultValueType===this.valueType && this.defaultUnit === this.unit){
                return undefined
            }
            let result =[];
            if(this.defaultValue!==this.value){
                // result.push(`"value":${JSON.stringify(this.value)}`);
                result.push(`"value":${serialize(this.value)}`);
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