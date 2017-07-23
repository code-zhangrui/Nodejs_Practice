let p = new Promise((resolve,reject)=>{
    // reject(1);
    setTimeout(reject,1000,'hello world')
});
console.log(p)

//1.将这些回调函数 存入处理队列 queue
//2.如果 promise 已经是 fullfilled 或者 reject 的状态了，autorun
// 数据结构的角度来讲==》 链表
// var another = p.then(val=>
p.then(val=>
    console.log(`resolve val is ${val}`)
,val=>
    console.log(`reject val is ${val}`)
);

setTimeout(()=>{
    console.log(p)
    p.catch(val=>console.log(`catch val is ${val}`))
}
,2000)
// p.catch(val=>console.log(`catch val is ${val}`))