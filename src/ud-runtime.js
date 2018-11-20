
// interface Constructable<T> {
//     new() : T;
// }



let _iota=0;

function iota(){
    return _iota++;
}
const Types ={
    NUMBER:iota(),
    BOOLEAN:iota(),
    STRING:iota(),
    ARRAY:(itemType)=>{
        return `${itemType} []`
    },
    MAP:(keyType,valueType)=>{
        return `<${keyType},${valueType}>`
    },
    CLASS:(className)=>{
        if(classDic.hasOwnProperty(className)){
            return `CLASS<${classDic[className].name}>`;
        }else{
            throw new Exeption(`class: [${className}] is not exist`) 
        }
       
    },
    ENUM:(enumName)=>{
        if(enumsDic.hasOwnProperty(enumName)){
            return `ENUM<${enumName}>`;
        }else{
            throw new Exeption(`ENUM: [${enumName}] is not exist`) 
        }
    },
    EMPTY:iota(), //空值
    ANY:iota(), //任意类型
};

/**
 * 判断对象是否是指定类型的实例
 * @param {Any} valueTarget 
 * @param {String} className 
 */
function isTypeOf(valueTarget,className){
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
    let keyValuePairObject= {};
    if(keyValuePairGenerator){
        keyValuePairObject=keyValuePairGenerator(iota)
    }
    enumsDic[name] = keyValuePairObject;
    return keyValuePairObject;
}
/**
 * 注册一个类型
 * @param typeName 
 * @param constructorFunc 
 */
var regClass = function(typeName ,constructorFunc){
    classDic[typeName] = constructorFunc
}

/**
 * 根据给定类型，动态创建一个类型的对象
 * @param typeName
 * @param params 
 */
var createClassObject = function(typeName,...params){
    let cons = classDic[typeName];
    if(cons!==undefined){
        // return cons.apply({},params)
        return new cons(...params)
    }else{
        return undefined
    }
    
}

var serialize = function(targetObject){

    let _serializeData = function(target){
        
    }

    return _serializeData(targetObject);
}


export {regClass,regEnums,createClassObject,Types,isTypeOf}