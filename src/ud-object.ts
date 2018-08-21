class UDObject {
    static identitySeed = 1;
    private identity: string; //自动化生成的唯一标识
    public id:string; //允许外部指定的唯一标识
    readonly typeName: string; //类型名称
    parent: UDObject; //节点的父亲节点
    children: Array<UDObject> ; //节点的孩子

    constructor(typeName: string) {
        this.typeName = typeName;
        this.identity = `${+new Date()}-${UDObject.identitySeed}`;
    }

    /**
     * can you add an child to this object
     * Tips:you should override this method in sub class
     * @param child 
     */
    canAddChild(child:UDObject){
        return true; 
    }

    /**
     * get index of the child.-1 means not found
     * @param child 
     */
    indexOfChild(child:UDObject){
        let index:number = -1;

        for(let i=0;i<this.children.length;i++){
            if(this.children[i].identity === child.identity){
                index =  i;
                break;
            }
        }
        return index;
    }

    addChild(child:UDObject){
        if(this.indexOfChild(child)>-1){
            return false;//the child is allready in
        }else{
            this.children.push(child);
            child.parent = this;
            return true; 
        }
    }
}

export default UDObject