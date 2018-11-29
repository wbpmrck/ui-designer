const expect = require('chai').expect;
const UD = require('../dist/ui-designer')
const sinon = require('sinon');
const serialize = UD.serialize;
const createClassObject = UD.createClassObject;
const UDObjec = UD.UDObjec;
const UDUIObject = UD.UDUIObject;
const UDUIContainer = UD.UDUIContainer;
const UDTouch = UD.UDTouch;
const UDTouchEventContext = UD.UDTouchEventContext;
const UDAttributeUnit = UD.UDAttributeUnit;

describe('runtime', () => {

    beforeEach(() => {
    });
    afterEach(() => {
    });

    it('', () => {
        

        let text1 = new UDUIObject();
        text1.w({value:201});
        text1.h({value:301});

        let div1 = new UDUIContainer();
        div1.x({value:20});
        div1.y({value:30});
        // div1.x.value=20;

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
    });
});