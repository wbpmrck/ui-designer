
/**
 * 抽象类：可序列化
 * PS：因为TS中不允许在Interface里添加static的方法，所以采用抽象类来定义这种约束
 */
abstract class UDSerializable {
    
    constructor(serializedString?: string) {
        if(serializedString!==undefined && serializedString!==null && serializedString.length>0){
            this.deserialize(serializedString)
        }
        
    }

    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    abstract serialize(options ?:any) : string |undefined

    /**
     * 接收输入的序列化字符串，进行反序列化，并设置到自身属性中
     * @param serializedString 
     */
    abstract deserialize(serializedString: string) : void 
}

export default UDSerializable