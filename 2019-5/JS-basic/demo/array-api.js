// 数组方法学习：方法的作用，是否返回新数组，是否改变原始数组，方法的参数（个数，数据类型，可选参数）使用数组基本的API构建简单的数据结构。
// 数组节省内存的方法。遍历数组的算法的最优解。

// 1.push方法 在数组后面加入元素
var arr = [];
arr.push(1, 2);

// 2.A instanceof Array 判断一个对象是某个已知类型，返回逻辑值

//把数组转化成字符串
var arr = ['Mike', 'John', 'Marry'];
var str1 = arr.join();
//如果不填参数，默认使用，链接元素
var str2 = arr.join('#');
//使用空字符串链接元素-无缝连接
var str3 = arr.join(' ');
var str4 = arr.join('&');

console.log(arr1);
console.log(arr1.toString());
console.log(typeof arr1.toString());
console.log(arr1.valueOf());
var c = typeof(arr.valueOf());

var arr = ['Mike','John','Sare'];
var arr2 = [1,2,3];
var aaa = arr.push('abc');
aaa = arr.push(arr2);
console.log(aaa);
console.log(arr);
// array.push()在数组的末尾添加元素，返回新数组的长度

var bbb = arr.pop();
// array.pop()表示删除数组最后一个元素，返回值为删除的元素。

var ccc = arr.unshift('abc');
// array.unshift('abc')表示在数组最前端添加元素，返回新的数组

var ddd = arr.shift();
// array.shift()表示在数组最前端删除元素，返回删除的元素

// 数组排序
var arr = [1,2,3,6,7,67,4,6];
console.log(arr.sort((a,b) => {
	return (a - b);
}));
console.log(arr.sort((a,b) =>{
	return -(a - b);
}));


//reverse 翻转后,原数组也改变顺序
var arr = ['a','u','e'];
console.log(arr.revserse());
var a = arr.reverse();
console.log(a);
console.log(arr);

// sort
console.log(arr2);
console.log(arr2.sort(function(a,b){
	return b-a;
}));

console.log('2'.charCodeAt());
//输出ASCII编码值

// bubble
function bubble(arr){
	for(var i = 0 ; i<arr.length; i++){
		for (var j = 0 ; j <arr.length-1;j++){
			if(arr[j]<arr[j+1]){
				var temp;
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
}

var arr1 = ["a","b","c"];
  var arr2 = [1,2,3];

// concat
var arr3 = arr1.concat(arr2);
console.log(arr1);
console.log(arr2);
console.log(arr3);
//[a,b,c,1,2,3]
//arr3.length == 6;

//slice较复杂,假设原始6项
var arr4 = arr3.slice(2);
//去掉第二项及之前项，arr4返回后四项 c123
var arr4 = arr3.slice(-2);
//直接返回后两项23
var arr4 = arr3.slice(4,2);
//去掉第四项及前面项，去掉第二项后面的，返回空。
var arr4 = arr3.slice(2,4);
//去掉第二项和前面的项，去掉第四项后面的所有项，返回第二项和第三项

// splice
var arr4 = arr3.splice(0,4,"item1","item2","item3");
// 从0项开始切割，共切四项，将新的items放到原始数组中，返回值为切除的四项。
// 
 

/* 元素查询索引
indexOf 返回第一个找到的索引
lastIndexOf 从最向前查第一个索引
找不到返回-1 */

//清空数组有三种方法
arr.splice(0);
arr.length = 0;
arr = [];
