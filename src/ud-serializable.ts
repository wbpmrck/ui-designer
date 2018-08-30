
/**
 * 抽象类：可序列化
 * PS：因为TS中不允许在Interface里添加static的方法，所以采用抽象类来定义这种约束
 */
abstract class UDSerializable {
    
    constructor(seriallizedString?: string) {
        if(seriallizedString!==undefined && seriallizedString!==null && seriallizedString.length>0){
            this.deserialize(seriallizedString)
        }
        
    }

    /**
     * 对自身进行序列化
     * @param options ：可选参数，用于控制序列化的行为
     */
    abstract serialize(options ?:any) : string 

    /**
     * 接收输入的序列化字符串，进行反序列化，并设置到自身属性中
     * @param seriallizedString 
     */
    abstract deserialize(seriallizedString: string) : void 
}

export default UDSerializable