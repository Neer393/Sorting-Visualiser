console.log("Hello World");

function swap(bar1,bar2){
    let temp=bar1.style.height;
    bar1.style.height=bar2.style.height;
    bar2.style.height=temp;
}

function disablebuttons(){
    document.querySelector("#cna").disabled =true;
    document.querySelector("#sz").disabled=true;
    document.querySelector("#bs").disabled=true;
    document.querySelector("#ms").disabled=true;
    document.querySelector("#ss").disabled=true;
    document.querySelector("#hs").disabled=true;
}

function enablebuttons(){
    document.querySelector("#cna").disabled =false;
    document.querySelector("#sz").disabled=false;
    document.querySelector("#bs").disabled=false;
    document.querySelector("#ms").disabled=false;
    document.querySelector("#ss").disabled=false;
    document.querySelector("#hs").disabled=false;
}

function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

let arraySize = document.querySelector("#sz");
arraySize.addEventListener('input',function(){
    console.log(arraySize.value,typeof(arraySize.value));
    createnewarray(arraySize.value);
});

let delay = 260;
let delayElement = document.querySelector('#Speed');
console.log(delayElement.value);
delayElement.addEventListener('input', function(){
    delay = 320 - parseInt(delayElement.value);
});

let array=[];
createnewarray();
function createnewarray(noofbars=60){
    deleteprev();
    array=[];
    for(let i=0;i<noofbars;i++){
        array.push(Math.floor(Math.random()*250)+1);
    }
    console.log(array);
    const bar=document.querySelector("#bars");
    let barwid=1000/noofbars;
    for(let i=0;i<noofbars;i++){
        const currentbar = document.createElement("div");
        currentbar.style.height=`${array[i]+150}px`;
        currentbar.style.width=`${barwid}px`;
        currentbar.classList.add('bar');
        currentbar.classList.add('flex-item');
        currentbar.classList.add(`barNo${i}`);
        bar.appendChild(currentbar);
    }
}

function deleteprev(){
    const bar = document.querySelector("#bars");
    bar.innerHTML='';
}

const newarray = document.querySelector("#cna");
newarray.addEventListener("click",function(){
    console.log("Clicked");
    enablebuttons();
    createnewarray(parseInt(arraySize.value));
});

async function bubblesort(){
    let counter=1;
    const n=arraySize.value;
    const ele = document.querySelectorAll(".bar");
    while(counter<n){
        for(let i=0;i<n-counter;i++){
            ele[i].style.background='blue';
            ele[i+1].style.background='blue';
            await waitforme(delay);
            if(ele[i].style.height>ele[i+1].style.height){
                swap(ele[i],ele[i+1]);
            }
            ele[i].style.background='cyan';
            ele[i+1].style.background='cyan';
        }
        ele[n-counter].style.background='green';
        counter++;
    }
    ele[0].style.background='green';
    console.log('executed');
}

async function selectionsort(){
    const n=arraySize.value;
    const ele = document.querySelectorAll(".bar");
    for(let i=0;i<n;i++){
        ele[i].style.background='blue';
        let minidx=i;
        for(let j=i+1;j<n;j++){
            ele[j].style.background='red';
            await waitforme(delay);
            if(ele[j].style.height<ele[minidx].style.height){
                if(minidx!==i){
                    ele[minidx].style.background='cyan';
                }
                minidx=j;
            }
            else{
                ele[j].style.background='cyan';
            }
        }
        await waitforme(delay);
        swap(ele[minidx],ele[i]);
        ele[minidx].style.background='cyan';
        ele[i].style.background='green';
    }
}

async function merge(ele,l,mid,r){
    let n1=mid+1-l;
    let n2=r-mid;
    let left = new Array(n1);
    let right=new Array(n2);
    for(let i=0;i<n1;i++){
        await waitforme(delay);
        ele[l+i].style.background='orange';
        left[i]=ele[l+i].style.height;
    }
    for(let i=0;i<n2;i++){
        await waitforme(delay);
        ele[mid+1+i].style.background='orange';
        right[i]=ele[mid+1+i].style.height;
    }
    await waitforme(delay);
    let i=0,j=0,k=l;
    while(i<n1 && j<n2){
        await waitforme(delay);
        if(left[i] < right[j]){
            if(n1+n2==ele.length){
                ele[k].style.background='green';
            }
            else{
                ele[k].style.background='lightgreen';
            }
            ele[k].style.height=left[i];
            i++;
            k++;
        }
        else{
            if(n1+n2==ele.length){
                ele[k].style.background='green';
            }
            else{
                ele[k].style.background='lightgreen';
            }
            ele[k].style.height=right[j];
            j++;
            k++;
        }
    }
    while(i<n1){
        await waitforme(delay);
        if(n1+n2==ele.length){
            ele[k].style.background='green';
        }
        else{
            ele[k].style.background='lightgreen';
        }
        ele[k].style.height=left[i];
        i++;
        k++;
    }
    while(j<n2){
        await waitforme(delay);
        if(n1+n2==ele.length){
            ele[k].style.background='green';
        }
        else{
            ele[k].style.background='lightgreen';
        }
        ele[k].style.height=right[j];
        j++;
        k++;
    }
}

async function mergesort(ele,l,r){
    if(l<r){
        let mid = l+Math.floor((r-l)/2);
        await mergesort(ele,l,mid);
        await mergesort(ele,mid+1,r);
        await merge(ele,l,mid,r);
    }
}

async function maxheapify(ele,n,i){
    let largest = i;
    let l=(2*i)+1;
    let r=(2*i)+2;
    if(l<n && ele[l].style.height>ele[largest].style.height){
        largest=l;
    }
    if(r<n && ele[r].style.height>ele[largest].style.height){
        largest=r;
    }
    if(largest!=i){
        ele[i].style.background='blue';
        ele[largest].style.background='blue';
        await waitforme(delay);
        swap(ele[i],ele[largest]);
        await maxheapify(ele,n,largest);
        ele[i].style.background='cyan';
        ele[largest].style.background='cyan';
    }
}

async function heapsort(ele,n){
    let startidx= Math.floor(n/2)-1;
    for(let i=startidx;i>=0;i--){
        await waitforme(delay);
        await maxheapify(ele,n,i);
    }
    await waitforme(delay);
    ele[0].style.background='blue';
    for(let i=n-1;i>=0;i--){
        await waitforme(delay);
        ele[i].style.background='blue';
        swap(ele[0],ele[i]);
        await maxheapify(ele,i,0);
        ele[i].style.background='green';
    }
}

let btnbs = document.querySelector("#bs");
btnbs.addEventListener("click",async function(){
    disablebuttons();
    await bubblesort();
    enablebuttons();
});

let btnss = document.querySelector("#ss");
btnss.addEventListener("click",async function(){
    disablebuttons();
    await selectionsort();
    enablebuttons();
})

let btnms=document.querySelector("#ms");
btnms.addEventListener("click",async function(){
    const ele=document.querySelectorAll(".bar");
    let l=0,r=ele.length-1;
    disablebuttons();
    await mergesort(ele,l,r);
    enablebuttons();
})

let btnhs=document.querySelector("#hs");
btnhs.addEventListener("click",async function(){
    const ele=document.querySelectorAll(".bar");
    let n=ele.length;
    disablebuttons();
    await heapsort(ele,n);
    enablebuttons();
})