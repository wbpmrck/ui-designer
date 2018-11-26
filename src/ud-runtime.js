
// interface Constructable<T> {
//     new() : T;
// }



let _iota=0;

function iota(){
    return _iota++;
}
const Types ={
    NUMBER:'number',
    BOOLEAN:'bool',
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

// /**
//  * 根据枚举的值，获得该值对应的枚举名称
//  * @param {any} enumValue 
//  */
// var nameOfEnums = function(enumValue){
//     for(var enumTypeName in classDic){
//         // console.log(enumTypeName)
//         let keyValPair = classDic[enumTypeName];
//         for(var key in keyValPair){
//             // console.log(key)
//             // console.log(keyValPair[key])
//             if(keyValPair[key] === enumValue){
//                 return `${enumTypeName}.${key}`;
//             }
//         }
//     }
// }
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
            }else{
                //如果修饰的是属性
                if(target.constructor === Field){
                    targets.__ud_serializable__ = canSerialize;
                }

            }
        }
    },
    /**
     * FIXME:当前因为ECMAScript并不支持对属性进行修饰，所以此decorator无法使用。后续要么考虑换成TS
     * 修饰字段，把它包装成一个属性
     */
    field:(typeName)=>{
        if(typeName===undefined){
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
                let fieldInit= new Field({typeName});
                    target[key] = fieldInit
                    descriptor.value = fieldInit;

                    window._s1 = target;
                // }
            }
            return descriptor;
            // return target;
        }
    },
}

class Field {
    type=Types.ANY;
    val=undefined;
    __ud_serializable__ = true; //默认可以序列化

    constructor({type,serializable}){
        this.type = type;
        this.__ud_serializable__ = serializable;
    }

    /**
     * 设置属性
     * TODO:以后可以考虑加入对newVal的类型检查
     * @param {Object} newVal 
     */
    set(newVal){
        this.val = newVal;
    }
}

function field({type,serializable}){
    return new Field({type,serializable});
}


/**
 * 注意：
 * 1、对于自定义类型，如果类型上有定义方法：getNoSerializeFields(),则调用，其返回的字符数组，表示了该对象上不需要参与序列化的属性列表
 * 2、如果类型上有自定义方法：serialize,则在序列化这个对象的时候，直接调用该方法进行序列化。
 * @param {Object} targetObject 
 */
var serialize = function(targetObject){

    //对一个对象进行序列化
    let _serializeData = function(target){
        let result;
        //对象非空
        if(target!==null && target !== undefined){
            //检查是否有自定义的序列化方法
            if(target.constructor.prototype.hasOwnProperty('serialize')){
                result=target.serialize();
            }else{
                //如果没有该方法，则尝试自动序列化。
                //首先看是否定义了不参与序列化的字段名列表(NOTICE:获取不需要序列化的字段，这个方法可以不提供，那么就以基类的为准。所以不从原型上判断，而是直接判断对象)
                if(target.getNoSerializeFields){
                    
                }
            }
        }else{
            return target;
        }
    }

    return _serializeData(targetObject);
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


export {regClass,regEnums,createClassObject,Types,isInstanceOf,DECORATORS,field}