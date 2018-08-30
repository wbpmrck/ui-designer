
import UDObjec  from "./ud-object"
import UDUIObject  from "./ud-ui-object"
import {UDAttribute,UDAttributeUnit}  from "./ud-attribute"



let agi = new UDAttribute<number>({defaultValue:0,serializedString:undefined});
agi.props.name="agi";
agi.props.unit="px";
agi.props.value=10;
// let agi = new UDAttribute<number>({name:"agi",value:12,unit:UDAttributeUnitEnum.PX,defaultValue:0,serializedString:undefined});
// let agi = new UDAttribute<number>("agi",10,UDAttributeUnitEnum.PX,0);


//json序列化
let agiString = JSON.stringify(agi);
console.log(`agiString=${agiString}`);

//类的方法序列化
let agiString2 = agi.serialize();
console.log(`agiString2=${agiString2}`);

//使用序列化的结果进行反序列化
let agi2 = new UDAttribute<number>({defaultValue:0,serializedString:agiString2});

console.log(`agi2=`);
console.log(agi2);

export default {
    UDObjec,
    UDUIObject,
    UDAttribute
}