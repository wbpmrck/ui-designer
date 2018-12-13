import {regEnums,regClass,createClassObject,Types} from "../ud-runtime"

import {UDAttributeUnit}  from "../enums/ud-unit"

const className = 'UDTouch'
/**
 * 表示可以被展示和显示的界面元素的容器
 * 注：UIContainer本身也是参与布局和渲染的
 */
class UDTouch{
    
    static seed=1; // 自增长数
    id=UDTouch.seed++; //事件唯一标识，每次触发都不一样
    // pageX=createAttribute('距页面左侧x坐标',0,Types.NUMBER,UDAttributeUnit.PX); //触点相对于整个页面左边沿的的X坐标. 当存在水平滚动的偏移时, 这个值包含了水平滚动的偏移
    // pageY=createAttribute('距页面左侧y坐标',0,Types.NUMBER,UDAttributeUnit.PX); //触点相对于整个页面上边沿的的Y坐标. 当存在垂直滚动的偏移时, 这个值包含了垂直滚动的偏移
    // clientX=createAttribute('距视口左侧x坐标',0,Types.NUMBER,UDAttributeUnit.PX); //触点相对于可见视区(visual viewport)左边沿的的X坐标. 不包括任何滚动偏移.
    // clientY=createAttribute('距视口左侧y坐标',Types.NUMBER,UDAttributeUnit.PX); //触点相对于可见视区(visual viewport)上边沿的的Y坐标. 不包括任何滚动偏移.
    // radiusX=createAttribute('接触面x轴半径',0,Types.NUMBER,UDAttributeUnit.PX); //能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径. 
    // radiusY=createAttribute('接触面y轴半径',0,Types.NUMBER,UDAttributeUnit.PX); //能够包围用户和触摸平面的接触面的最小椭圆的垂直轴(Y轴)半径. 
    // force=createAttribute('手指压力',0,Types.NUMBER,UDAttributeUnit.NONE); //手指挤压触摸平面的压力大小, 从0.0(没有压力)到1.0(最大压力)的浮点数 
    // rotationAngle=createAttribute('接触角度',0,Types.NUMBER,UDAttributeUnit.ANGLE); //它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面.

    // constructor({pageX,pageY,clientX,clientY,radiusX,radiusY,force,rotationAngle}) {
    //     this.pageX.setValue(pageX);
    //     this.pageY.setValue(pageY);
    //     this.clientX.setValue(clientX);
    //     this.clientY.setValue(clientY);
    //     this.radiusX.setValue(radiusX);
    //     this.radiusY.setValue(radiusY);
    //     this.force.setValue(force);
    //     this.rotationAngle.setValue(rotationAngle);
    // }
}
regClass(className,UDTouch)

export default UDTouch;