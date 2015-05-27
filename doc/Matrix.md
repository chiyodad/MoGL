# Matrix
* parent : MoGL
* [Constructor](#constructor)

**field**

**method**
없음 

**static**
* [Matrix.matClone](#matclone)
* [Matrix.matCopy](#matcopy)
* [Matrix.matIdentity](#matㅑdentity)
* [Matrix.matMultiply](#matmultiply)
* [Matrix.matTranslate](#mattranslate)
* [Matrix.matScale](#matscale)
* [Matrix.matRotate](#matrotate)
* [Matrix.matRotateX](#matrotateX)
* [Matrix.matRotateY](#matrotateY)
* [Matrix.matRotateZ](#matrotateZ)
* [Matrix.matRotate](#matrotate)
* [Matrix.matPerspective](#matperspective)
* [Matrix.matLookAt](#matlookAt)
* [Matrix.matStr](mat#str)

[top][#]
## Constructor

**description**

1. 행렬연산을 cpu측에서 수행하기 위한 헬퍼객체. 
2. 생성과 함께 identyty를 실행
3. this._rowData에 Float32Array형식의 초기 배열이 생김
4. 4x4형식의 행렬을 다룸

**param**

없음.

**return**

this

**sample**
```javascript
var matrix1 = new Matrix()
var matrix2 = Matrix() // 팩토리로도 생성가능!
```

[top](#)
## matIdentity()

**description**

본인(this._rowData)를 초기화

**param**

없음

**sample**
```javascript
var matrix = new Matrix()
matrix.matIdentity()
```

[top](#)
## matClone()

**description**

matrix를 복제

**param**

없음

**return**

복제한 새로운 행렬 객체를 반환

**sample**
```javascript
var matrix = new Matrix()
var cloneMatrix = matrix.matClone()
```

[top](#)
## matCopy(targetMatrix:Matrix)

**description**

targetMatrix에 matrix를 복사

**param**

1. targetMatrix : 복제대상 매트릭스 객체

**return**

this

**sample**
```javascript
var mat1 = new Matrix()
var mat2 = new Matrix()
mat2= mat1.clone(mat2)
// mat2의 _rowData에 mat1의 _rowData가 복제
```

[top](#)

## matIdentity()

**description**

자신읜 _rowData를 초기화

**param**

없음

**return**

this

**sample**
```javascript
var matrix = new Matrix(
mat1.matIdentity()
```

[top](#)
## matMultiply(targetMatrix:Matrix)

**description**
자신읜 _rowData와 target Matrix의 _rowData를 곱

**param**

1. targetMatrix : 곱할 matrix 객체

**return**

this

**sample**
```javascript
var matrix1 = new Matrix()
var matrix2 = new Matrix()
matrix1.matMultiply(matrix2)
```

[top](#)
## matTranslate(x:Number,y:Number,z:Number)

**description**
자신의 _rowData를 x, y, z 방향으로 평행이동 시킴

**param**

1. x : x 평행이동 값
2. y : y 평행이동 값
3. z : z 평행이동 값

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matTranslate(10,20,30)
```

[top](#)
## matScale(x:Number,y:Number,z:Number)

**description**
x,y,z축 방향으로 행렬을 확장시킴

**param**

1. x : x 확대 값
2. y : y 확대 값
3. z : z 확대 값

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matScale(10,20,30)
```

[top](#)
## matRotateX(rad:Number)

**description**
x축 방향으로 행렬을 회전 시킨 행렬을 반환

**param**

1. rad : 회전 라디안 값

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matRotateX(0.1)
```

[top](#)
## matRotateY(rad:Number)

**description**
y축 방향으로 행렬을 회전 시킨 행렬을 반환

**param**

1. rad : 회전 라디안 값

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matRotateY(0.1)
```

[top](#)
## matRotateZ(rad:Number)

**description**
z축 방향으로 행렬을 회전 시킨 행렬을 반환

**param**

1. rad : 회전 라디안 값

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matRotateZ(0.1)
```

[top](#)
## matRotate(rad:Number, axis:Array[x,y,z])

**description**
axis를 기준으로 한 증분회전

**param**

1. rad : 회전 라디안 값
2. axis : 기준축

**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matRotate(0.1,[1,2,3])
```

[top](#)
## matPerspective(fov:number,aspect::number,near::number,far:number)

**description**
퍼스펙티브 행렬을 생성

**return**

this

**param**

1. fov : fov
2. aspect : width/height
3. near : 절단면의 최소z (0<값)
4. far : 절단면의 최대z

**sample**
```javascript
var matrix = new Matrix()
matrix.matPerspective(45, 2/1,0.1,100000)
```

[top](#)
## matLookAt(eye:Array[x,y,z],center:Array[x,y,z],up:Array[x,y,z])

**description**
eye 벡터가 center 벡터를 바라보는 회전 행렬 생성

**param**

1. eye : 대상객체의 포지션
2. center : 바라볼 포지션
3. up : 업벡터


**return**

this

**sample**
```javascript
var matrix = new Matrix()
matrix.matLookAt([100,100,100],[0,0,0],[0,1,0])
```

[top](#)

