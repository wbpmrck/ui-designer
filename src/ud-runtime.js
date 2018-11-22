
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
            throw new Exeption(`class: [${UDType.name}] is not exist`) 
        }
       
    },
    // CLASS:(className)=>{
    //     if(classDic.hasOwnProperty(className)){
    //         // return `CLASS<${classDic[className].name}>`;
    //         return classDic[className].name;
    //     }else{
    //         throw new Exeption(`class: [${className}] is not exist`) 
    //     }
       
    // },
    // ENUM:(enumName)=>{
    //     if(enumsDic.hasOwnProperty(enumName)){
    //         return `ENUM<${enumName}>`;
    //     }else{
    //         throw new Exeption(`ENUM: [${enumName}] is not exist`) 
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
    // todo:根据className,进行细致的判断，确定valueTarget是否是指定类型的实例
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
                this.key = undefined;
                this.val = undefined;
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
                _enumCons[key].key= key;
                _enumCons[key].val= keyValuePairObject[key];

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
        //todo:创建对应枚举值
    }
    else{
        return undefined
    }
    
}

/**
 * 注意：
 * 1、对于自定义类型，如果类型上有定义方法：getNoSerializeFields(),则调用，其返回的字符数组，表示了该对象上不需要参与序列化的属性列表
 * 2、如果类型上有自定义方法：serialize,则在序列化这个对象的时候，直接调用该方法进行序列化。
 * @param {Object} targetObject 
 */
var serialize = function(targetObject){

    let _serializeData = function(target){
        
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

/**
 * 所有枚举类的基类
 */
class UDEnumBase {
    val;
}

export {regClass,regEnums,createClassObject,Types,isInstanceOf,UDEnumBase}