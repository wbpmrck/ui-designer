
// interface Constructable<T> {
//     new() : T;
// }

let classDic : { [key: string]: any } = {
};

/**
 * 注册一个类型
 * @param typeName 
 * @param constructorFunc 
 */
var regClass = function(typeName :string,constructorFunc :any){
    classDic[typeName] = constructorFunc
}

/**
 * 根据给定类型，动态创建一个类型的对象
 * @param typeName
 * @param params 
 */
var createClassObject = function(typeName:string,...params : any[]){
    let cons = classDic[typeName];
    if(cons!==undefined){
        // return cons.apply({},params)
        return new cons(...params)
    }else{
        return undefined
    }
    
}


export {regClass,createClassObject}