// 数组去重
// array.filter(fucntion(){});
//filter方法：内部调用函数，函数返回值为true的直接构成新的数组输出，函数返回值为false的不输出。
var arr = [1200,1300,1500,2000,2100,3500];
var arr2 = arr.filter(function(element,index,array){
  if(element<2000){
    return true;
  }else {
    return false;
  }
});
console.log(arr2);

// 数组计算不同元素的个数并储存到对象中（新建对象）
var arr3 = ['a','b','c','b'];
var json = {};
for (var i = 0 ; i <arr3.length ; i ++){
  if(json[arr3[i]]){
    json[arr3[i]] ++;
  }else{
    json[arr3[i]] = 1;
  }
}
console.log(json);

// for in loop
var obj = {};
for(var i = 0 ; i < 10 ; i++) {
  obj[i] = i * 2 + 1;
}
for(var key in obj) {
  console.log(key+'=='+obj[key]);
}
console.log(obj);


// 将一个字符串数组输出为|分割的形式，比如“刘备|张飞|关羽”。使用两种方式实现
var arr = ["刘备","张飞","关羽"];
var str = arr[0];
var separator = "|";
for(var i=1;i<arr.length;i++){
   str+=separator+arr[i];
}
console.log(arr.join("|"));

// 将一个字符串数组的元素的顺序进行反转。["a","b","c","d"] ["d","c","b","a"]。使用两种种方式实现。提示：第i个和第length-i-1个进行交换
var arr1 = [1,2,3];
console.log(arr1.reverse());

//第一种
function reverse1(array){
   var newArr = [];
   for(var i=array.length-1;i>=0;i--){
       newArr[newArr.length] = array[i];
   }
   return newArr;
}
//第二种
function reverse2(array){
   for(var i=0;i<array.length/2;i++){
       var temp = array[i];
       array[i] = array[array.length-1-i];
       array[array.length-1-i] = temp;
   }
   return array;
}


// 工资的数组[1500,1200,2000,2100,1800],把工资超过2000的删除
var arr3 = [1500,1200,2000,2100,1800];

var arr4 = arr3.filter(function (ele,index,array) {
   if(ele<2000){
       return true;
   }
   return false;
})
console.log(arr3);
console.log(arr4);


// ["c","a","x","a","x","a"]找到数组中每一个元素出现的次数
// 利用对象来做。我们想知道，a出现了几次，c出现了几次，x出现了几次。
// k:v ..  k:v使用键值对比较方便，而使用数组，不太方便了。
// 思路：创建一个对象，判断数组中的元素，在对象中是否存在，如果存在，值+1；否则创建一个数组元素的属性，然后给值赋值为1；

var arr5 = ["c","a","x","a","x","a"];

var json = {};
//    console.log(json["aflasdfasdf"]); 不存在的属性，返回值是undefined。
for(var i=0;i<arr5.length;i++){
   //判断数组中的元素，在json中是否存在属性值。
   if(json[arr5[i]]){
       json[arr5[i]] += 1;
   }else{
       json[arr5[i]] = 1;
   }
}
console.log(json);

var  json = {"kkk":1};
json["kkkk"] = 1;

//    编写一个方法 去掉一个数组的重复元素
var arr = [1,2,3,4,5,2,3,4];
console.log(arr);
var aaa = fn(arr);
console.log(aaa);
//思路：创建一个新数组，循环遍历，只要新数组中有老数组的值，就不用再添加了。
function fn(array){
    var newArr = [];
    for(var i=0;i<array.length;i++){
        //开闭原则
        var bool = true;
        //每次都要判断新数组中是否有旧数组中的值。
        for(var j=0;j<newArr.length;j++){
            if(array[i] === newArr[j]){
                bool = false;
            }
        }
        if(bool){
            newArr[newArr.length] = array[i];
        }
    }
    return newArr;
}


// json
var obj1 = new Object();
console.log(obj1);

var obj2 = {
  aaa:obj1,
  name:"zhang",
  'age':19,
  sayHi:function(){
    console.warn(1);
  }
};
console.log(obj2);
obj2.sayHi();
</script>
<script>
var json = {
  'name':'Mike',
  'age':19,
  'arr':[123]
};
console.log(json.length);
for(var key in json){
  console.log(key+'值'+json[key])
}