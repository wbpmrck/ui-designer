import {regEnums,regClass,createClassObject,Types,DECORATORS,field,UDAttribute} from "./ud-runtime"

const className = 'UDAction'
/**
 * 一个行为
 * 行为通常由对象提供，用于触发某种动作，实现特殊的功能
 */
@DECORATORS.serializable(true)
class UDAction{
    

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.UDObjectID,desc:'产生行为的对象id',value:''})
    objectId(){}; //产生行为的对象_id

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'行为名称',value:''})
    name(){}; //行为名称,在发生行为的对象内，该名称应该是唯一的

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:String.getType(),desc:'行为描述',value:''})
    desc(){}; //行为描述

    @DECORATORS.serializable(true)
    @DECORATORS.field({type:Types.ARRAY(UDAttribute.getType()),desc:'行为接收的参数',value:[]})
    params(){}; //行为接收的参数
    // returnValue; //行为的返回参数 TODO:本期暂时不考虑行为的返回值，原因：1、在编辑系统里，如果让用户理解并使用返回值系统，太过于复杂  2、如果真要利用返回值，则应该让action的结果反馈到object本身，通过object的event暴露出来给用户使用

    constructor({name,desc,params,objectId}) {
        this.name({value:name});
        this.objectId({value:objectId});
        // this.desc = desc;
        this.desc({value:desc});
        this.params({value:params});
        // this.name = name;
        // this.params = params;
    }
    
}
regClass(className,UDAction)

export default UDAction;