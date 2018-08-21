import UDObject from './ud-object'

/**
 * 表示可以被展示和显示的界面元素对象
 */
class UDUIObject extends UDObject{
    public x:number; //x坐标
    public y:number; //y坐标
    public z:number; //y坐标
    constructor(typeName: string) {
        super(typeName);
    }
}

export default UDUIObject;