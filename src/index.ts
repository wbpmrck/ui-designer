
import UDObjec  from "./ud-object"
import UDUIObject  from "./ud-ui-object"
import {UDAttribute,UDAttributeUnit}  from "./ud-attribute"



// let agi = new UDAttribute({defaultValue:0,serializedString:undefined});
// agi.name="agi";
// agi.unit="px";
// agi.value=10;
// // let agi = new UDAttribute<number>({name:"agi",value:12,unit:UDAttributeUnitEnum.PX,defaultValue:0,serializedString:undefined});
// // let agi = new UDAttribute<number>("agi",10,UDAttributeUnitEnum.PX,0);


// //json序列化
// let agiString = JSON.stringify(agi);
// console.log(`agiString=${agiString}`);

// //类的方法序列化
// let agiString2 = agi.serialize();
// console.log(`agiString2=${agiString2}`);

// //使用序列化的结果进行反序列化
// let agi2 = new UDAttribute({defaultValue:0,serializedString:agiString2});

// console.log(`agi2=`);
// console.log(agi2);


// 创建一个UI对象

let div1 = new UDUIObject({typeName:"UDUIObject",serializedString:undefined});
div1.attributes.x.value=20;

let div2 = new UDUIObject({typeName:"UDUIObject",serializedString:undefined});
div2.attributes.x.value=22;
div2.attributes.y.value=122;
div2.attributes.z.value=0;

div1.addChild(div2);

let div1Str = div1.serialize();
console.log(`div1Str=${div1Str}`);
console.log(JSON.parse(div1Str));


let div1New = new UDUIObject({typeName:"UDUIObject",serializedString:div1Str});
console.log(`div1New=`);
console.log(div1New);



export default {
    UDObjec,
    UDUIObject,
    UDAttribute
}