# Sorting-Visualiser
A creative way of understanding how Sorting Algorithms work is through visual senses  
Here I have described 4 different Sorting Algorithms  

## 1. **Bubble Sort**
This Algorithm repeatedly swaps adjacent elements if they are in the wrong order or previous element is larger than the current element.  
So in one pass of this algorithm the largest element from the array reaches the end of the array like a bubble reaches the surface.  
Hence this Algorithm is termed as Bubble Sort Algorithm.  
Algorithm works with a worst case Time Complexity of **O(N^2)**  
```C++
//Code in C++
void bubbleSort(int arr[],int n){
    int counter=1;
    while(counter<n){
        for(int i=0;i<n-counter;i++){
            if(arr[i]>arr[i+1]){
                swap(arr[i],arr[i+1]);
            }
        }
        counter++;
    }
}
```

## 2. **Selection Sort**
This Algorithm repeatedly finds the lowest element from the unsorted array and puts it at the begining  
Since this Algorithm selects the smallest element and pushes it to the begining, this Algorithm is termed Selection Sort Algorithm  
Algorithm works with a worst case Time Complexity of **O(N^2)**  
```C++
//Code in C++
void selectionSort(int arr[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=i+1;j<n;j++){
            if(arr[j]<arr[i]){
                swap(arr[i],arr[j]);
            }
        }
    }
}
```

## 3. **Merge Sort**
This Algorithm is based on Divide and Conquer Algorithm in which you keep on dividing the array into half untill left with a single element and then keep on merging them in a sorted order  
The fact that this Algorithm divides and then merge's the divided array is the reason this algorithm is termed Merge Sort  
Algorithm works with a worst case Time Complexity of **O(NlogN)**
```C++
//Code in C++
void merge(int arr[],int l,int mid,int r){
    int n1=mid+1-l;
    int n2=r-mid;
    int a[n1],b[n2];
    for(int i=0;i<n1;i++){
        a[i]=arr[l+i];
    }
    for(int i=0;i<n2;i++){
        b[i]=arr[mid+1+i];
    }
    int i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(a[i]<b[j]){
            arr[k]=a[i];
            i++;
            k++;
        }
        else{
            arr[k]=b[j];
            j++;
            k++;
        }
    }
    while(i<n1){
        arr[k]=a[i];
            i++;
            k++;
    }
    while(j<n2){
        arr[k]=b[j];
            j++;
            k++;
    }
}
void mergeSort(int arr[],int l,int r){
    if(l<r){
        int mid = (l+r)/2;
        mergeSort(arr,l,mid);
        mergeSort(arr,mid+1,r);
        merge(arr,l,mid,r);
    }
}
```

## 4. **Heap Sort**
Heap sort is a comparison-based sorting technique based on Binary Heap data structure.  
It is similar to the selection sort where we first find the minimum element and place the minimum element at the beginning and this process is repeated for the remaining elements.  
Algorithm works with a worst case Time Complexity of **O(NlogN)**
```C++
//Code in C++
void maxheapify(int arr[],int n,int i){
    int largest =i;
    int l=(2*i)+1;
    int r=(2*i)+2;
    
    if(l<n && arr[l]>arr[largest]){
        largest=l;
    }
    if(r<n && arr[r]>arr[largest]){
        largest=r;
    }
    if(largest!=i){
        swap(arr,i,largest);
        maxheapify(arr,n,largest);
    }
}
void heapsort(int arr[],int n){
    int startidx =(n/2)-1;
    for(int i=startidx;i>=0;i--){
        maxheapify(arr,n,i);
    }
    for(int i=n-1;i>=0;i--){
        swap(arr,0,i);
        maxheapify(arr,i,0);
    }
}
```
