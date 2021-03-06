**실험실**

# OrbitController
* parent : [MoGL](MoGL.md)
* [Constructor](#constructor)

**field**

**method**

* [update](#update)* 
* [getSpeed](#getspeed)
* [getSmoothDelay](#getsmoothdelay)
* [getMinDistance](#getmindistance)
* [getMaxDistance](#getmaxdistance)
* [getDistance](#getdistance)
* [setSpeed](#setspeed-valuenumber)
* [setSmoothDelay](#setsmoothdelay-valuenumber)
* [setMinDistance](#setmindistance-valuenumber)
* [setMaxDistance](#setmaxdistance-valuenumber)
* [setDistance](#setdistance-valuenumber)



[top](#)
## Constructor
```javascript
OrbitController(camera:Camera)
```

**description**

1. 카메라객체를 궤도카메라 모드로 제어하는 컨트롤러 객체

**exception**

* 'OrbitController.constructor:0' - 카메라 객체가 아닐때..

**param**

1. camera : 카메라객체.

**sample**

```javascript
// 카메라 객체만 인자로 받음
var controller = new OrbitController(new Camera())
```
[top](#)
## getSpeed

**description**

1. 컨트롤러 speed값을 반환
2. 기본값 : 500.0

**param**

없음

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.getSpeed()
```
[top](#)

## getSmoothDelay

**description**

1. 컨트롤러의 smoothDelay값을 반환
2. 기본값 : 0.1

**param**

없음

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.getSmoothDelay()
```

[top](#)
## getMinDistance

**description**

1. 카메라와 중심축의 최소 거리값
2. 기본값 : 50.0

**param**

없음

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.getMinDistance()
```

[top](#)
## getMaxDistance

**description**

1. 카메라와 중심축의 최대 거리값
2. 기본값 : 200.0

**param**

없음

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.getMaxDistance()
```

[top](#)
## getDistance

**description**

1. 카메라와 중심축의 현재 거리값

**param**

없음

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.getDistance()
```

[top](#)
## setSpeed( value:number)

**description**

1. 컨트롤러의 speed값을 설정

**param**

1 value : Number형태로 값을 설정

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.setSpeed(2)
```
[top](#)
## setSmoothDelay( value:number)

**description**

1. 컨트롤러의 smoothDelay값을 설정
2. 0~0.5 사이값만 허용. 0.5 이상의 값은 강제로 0.5로 설정

**param**

1 value : Number형태로 값을 설정

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.setSmoothDelay(0.2)
```

[top](#)
## setMinDistance( value:number)

**description**

1. 카메라와 중심축의 최소 거리값 설정

**param**

1. value : Number형태로 값을 설정
2. 설정하려는 값이 1이하면 1로 강제설정

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.setMinDistance(10)
```

[top](#)
## setMaxDistance( value:number)

**description**

1. 카메라와 중심축의 최대 거리값 설정

**param**

1. value : Number형태로 값을 설정

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.setMaxDistance(250)
```

[top](#)
## setDistance( value:number)

**description**

1. 카메라와 중심축의 현재 거리값 설정

**param**

1. value : Number형태로 값을 설정

**sample**

```javascript
var camera = new Camera()
var controller = new OrbitController(camera)
controller.setDistance(250)
```


[top](#)
## update

**description**

1. 컨트롤러 상태를 업데이트.

**param**

없음

**sample**

```javascript
var controller = new OrbitController(camera)
setInterval(function(){
  controller.update()
  world.render()
},1000/60)
```

[top](#)
