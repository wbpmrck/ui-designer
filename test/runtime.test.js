const expect = require('chai').expect;
const UD = require('../dist/ui-designer')
const sinon = require('sinon');
const serialize = UD.serialize;
const UDRange = UD.UDRange;
const deserialize = UD.deserialize;
const createClassObject = UD.createClassObject;
const UDObjec = UD.UDObjec;
const UDUIObject = UD.UDUIObject;
const UDUIContainer = UD.UDUIContainer;
const UDTouch = UD.UDTouch;
const UDTouchEventContext = UD.UDTouchEventContext;
const UDAttributeUnit = UD.UDAttributeUnit;
const UDEvent = UD.UDEvent;
const UDEventHandler = UD.UDEventHandler;
const UDAction = UD.UDAction;
const UDExpression = UD.UDExpression;
const UDArithmeticOperator = UD.UDArithmeticOperator;
const UDAttributeVisitOperator = UD.UDAttributeVisitOperator;
const UDCompareOperator = UD.UDCompareOperator;
const UDLogicOperator = UD.UDLogicOperator;
const UDRelationOperator = UD.UDRelationOperator;

const UDCompareOperatorEnum = UD.UDCompareOperatorEnum;
const UDArithmeticOperatorEnum = UD.UDArithmeticOperatorEnum;
const UDLogicOperatorEnum = UD.UDLogicOperatorEnum;
const UDRelationOperatorEnum = UD.UDRelationOperatorEnum;

describe('runtime', () => {

    beforeEach(() => {
    });
    afterEach(() => {
    });

    it('can serialize object and deserialize them', () => {

        let text1 = new UDUIObject();
        text1.w({value:201});
        text1.h({value:301});


        let div1 = new UDUIContainer();
        div1.x({value:20});
        div1.y({value:30});



        let div2 = new UDUIContainer();
        div2.x({value:120});
        div2.z({value:4});

        let div3 = new UDUIContainer();
        div3.x({value:220});
        div3.z({value:42});

        div3.addChild(text1);
        div1.addChild(div2);
        div1.addChild(div3);

        
        let action1 = div2.constructor.getSupportActions()[5];
        action1.objectId({value:div2._id().value});
        action1.params().value[0].setValue(UDRange.LAYER); 
        div1.eventHandlers({
            value:[
                new UDEventHandler({
                    eventName:'tap',
                    expression:new UDExpression({
                        operator: new UDCompareOperator({operateSymbol:UDCompareOperatorEnum.GT}),
                        leftOperand:new UDExpression({
                            operator: new UDAttributeVisitOperator({operateSymbol:'.'}),
                            leftOperand:text1._id().value,
                            rightOperand:'x'
                        }),
                        rightOperand:10
                    }),
                    actions:[
                        action1
                    ],
                    eventFrom:div1
                })
            ]
        })


        var sdiv = serialize(div1);
        console.log(sdiv)
        console.log(JSON.parse(sdiv))

        var deserilized = deserialize(sdiv);

        console.log(JSON.stringify(deserilized));

        //开始验证
        let des_div1 = deserilized;
        let des_div2 = des_div1.children().value[0];
        let des_div3 = des_div1.children().value[1];
        let des_text1 = des_div3.children().value[0];
        let evtHandler = des_div1.eventHandlers().value[0];
        let expOperator = evtHandler.expression().value.operator().value.operateSymbol().value;
        let des_action1 = evtHandler.actions().value[0];

        // 01.div1,事件处理对象相关验证

        expect(des_div1).to.deep.equal(div1);
        expect(des_div1.x().value).to.equal(div1.x().value);
        expect(des_div1.x().desc).to.equal(div1.x().desc);
        expect(des_div1.x().unit).to.equal(div1.x().unit);
        expect(des_div1.__ud_attribute_x__.defaultValue).to.equal(div1.__ud_attribute_x__.defaultValue);
        expect(des_div1.__ud_attribute_x__.defaultValueType).to.equal(div1.__ud_attribute_x__.defaultValueType);
        expect(des_div1.__ud_attribute_x__.valueType).to.equal(div1.__ud_attribute_x__.valueType);
        expect(des_div1.__ud_attribute_x__.defaultUnit).to.equal(div1.__ud_attribute_x__.defaultUnit);

        expect(des_div1.y().value).to.equal(div1.y().value);
        expect(des_div1.y().desc).to.equal(div1.y().desc);
        expect(des_div1.y().unit).to.equal(div1.y().unit);
        expect(des_div1.__ud_attribute_y__.defaultValue).to.equal(div1.__ud_attribute_y__.defaultValue);
        expect(des_div1.__ud_attribute_y__.defaultValueType).to.equal(div1.__ud_attribute_y__.defaultValueType);
        expect(des_div1.__ud_attribute_y__.valueType).to.equal(div1.__ud_attribute_y__.valueType);
        expect(des_div1.__ud_attribute_y__.defaultUnit).to.equal(div1.__ud_attribute_y__.defaultUnit);

        expect(evtHandler.eventName().value).to.equal('tap')
        expect(evtHandler.actions().value.length).to.equal(1)
        expect(evtHandler.actions().value[0]).to.deep.equal(action1)
        expect(expOperator).to.equal(UDCompareOperatorEnum.GT)

        expect(action1).to.deep.equal(des_action1);
        expect(des_action1.objectId().value).to.equal(action1.objectId().value);

        // 02.text验证
        expect(des_text1.w().value).to.equal(text1.w().value);
        expect(des_text1.w().desc).to.equal(text1.w().desc);
        expect(des_text1.w().unit).to.equal(text1.w().unit);
        expect(des_text1.__ud_attribute_w__.defaultValue).to.equal(text1.__ud_attribute_w__.defaultValue);
        expect(des_text1.__ud_attribute_w__.defaultValueType).to.equal(text1.__ud_attribute_w__.defaultValueType);
        expect(des_text1.__ud_attribute_w__.valueType).to.equal(text1.__ud_attribute_w__.valueType);
        expect(des_text1.__ud_attribute_w__.defaultUnit).to.equal(text1.__ud_attribute_w__.defaultUnit);

        expect(des_text1.h().value).to.equal(text1.h().value);
        expect(des_text1.h().desc).to.equal(text1.h().desc);
        expect(des_text1.h().unit).to.equal(text1.h().unit);
        expect(des_text1.__ud_attribute_h__.defaultValue).to.equal(text1.__ud_attribute_h__.defaultValue);
        expect(des_text1.__ud_attribute_h__.defaultValueType).to.equal(text1.__ud_attribute_h__.defaultValueType);
        expect(des_text1.__ud_attribute_h__.valueType).to.equal(text1.__ud_attribute_h__.valueType);
        expect(des_text1.__ud_attribute_h__.defaultUnit).to.equal(text1.__ud_attribute_h__.defaultUnit);


        // 03. div2验证
        expect(des_div2.x().value).to.equal(div2.x().value);
        expect(des_div2.x().desc).to.equal(div2.x().desc);
        expect(des_div2.x().unit).to.equal(div2.x().unit);
        expect(des_div2.__ud_attribute_x__.defaultValue).to.equal(div2.__ud_attribute_x__.defaultValue);
        expect(des_div2.__ud_attribute_x__.defaultValueType).to.equal(div2.__ud_attribute_x__.defaultValueType);
        expect(des_div2.__ud_attribute_x__.valueType).to.equal(div2.__ud_attribute_x__.valueType);
        expect(des_div2.__ud_attribute_x__.defaultUnit).to.equal(div2.__ud_attribute_x__.defaultUnit);

        expect(des_div2.z().value).to.equal(div2.z().value);
        expect(des_div2.z().desc).to.equal(div2.z().desc);
        expect(des_div2.z().unit).to.equal(div2.z().unit);
        expect(des_div2.__ud_attribute_z__.defaultValue).to.equal(div2.__ud_attribute_z__.defaultValue);
        expect(des_div2.__ud_attribute_z__.defaultValueType).to.equal(div2.__ud_attribute_z__.defaultValueType);
        expect(des_div2.__ud_attribute_z__.valueType).to.equal(div2.__ud_attribute_z__.valueType);
        expect(des_div2.__ud_attribute_z__.defaultUnit).to.equal(div2.__ud_attribute_z__.defaultUnit);

        // 04. div3验证
        expect(des_div3.x().value).to.equal(div3.x().value);
        expect(des_div3.x().desc).to.equal(div3.x().desc);
        expect(des_div3.x().unit).to.equal(div3.x().unit);
        expect(des_div3.__ud_attribute_x__.defaultValue).to.equal(div3.__ud_attribute_x__.defaultValue);
        expect(des_div3.__ud_attribute_x__.defaultValueType).to.equal(div3.__ud_attribute_x__.defaultValueType);
        expect(des_div3.__ud_attribute_x__.valueType).to.equal(div3.__ud_attribute_x__.valueType);
        expect(des_div3.__ud_attribute_x__.defaultUnit).to.equal(div3.__ud_attribute_x__.defaultUnit);

        expect(des_div3.z().value).to.equal(div3.z().value);
        expect(des_div3.z().desc).to.equal(div3.z().desc);
        expect(des_div3.z().unit).to.equal(div3.z().unit);
        expect(des_div3.__ud_attribute_z__.defaultValue).to.equal(div3.__ud_attribute_z__.defaultValue);
        expect(des_div3.__ud_attribute_z__.defaultValueType).to.equal(div3.__ud_attribute_z__.defaultValueType);
        expect(des_div3.__ud_attribute_z__.valueType).to.equal(div3.__ud_attribute_z__.valueType);
        expect(des_div3.__ud_attribute_z__.defaultUnit).to.equal(div3.__ud_attribute_z__.defaultUnit);


    });
});