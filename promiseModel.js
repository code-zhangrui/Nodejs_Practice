let p = new Promise((resolve,reject)=>{
    reject(1);
});
console.log(p)

p.then(val=>
    console.log(`resolve val is ${val}`)
,val=>
    console.log(`reject val is ${val}`)
)