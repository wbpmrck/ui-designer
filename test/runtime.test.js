const expect = require('chai').expect;
const UD = require('../dist/ui-designer')
const sinon = require('sinon');
const serialize = UD.serialize;
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
        
        div1.eventHandlers({
            value:[
                new UDEventHandler({
                    eventName:'tap',
                    expression:new UDExpression({
                        operator: new UDCompareOperator({operateSymbol:UDCompareOperatorEnum.GT}),
                        leftOperand:new UDExpression({
                            operator: new UDAttributeVisitOperator({operateSymbol:'.'}),
                            leftOperand:text1._identity().value,
                            rightOperand:'x'
                        }),
                        rightOperand:10
                    }),
                    actions:[

                    ],
                    eventFrom:div1
                })
            ]
        })



        let div2 = new UDUIContainer();
        div2.x({value:120});
        div2.z({value:4});

        let div3 = new UDUIContainer();
        div3.x({value:220});
        div3.z({value:42});

        div3.addChild(text1);
        div1.addChild(div2);
        div1.addChild(div3);

        var sdiv = serialize(div1);
        console.log(sdiv)
        console.log(JSON.parse(sdiv))

        var deserilized = deserialize(sdiv);

        console.log(JSON.stringify(deserilized));

        //开始验证
        let expOperator = deserilized.eventHandlers().value[0].expression().value.operator().value.operateSymbol().value;

        expect(expOperator).to.equal(UDCompareOperatorEnum.GT)
    });
});