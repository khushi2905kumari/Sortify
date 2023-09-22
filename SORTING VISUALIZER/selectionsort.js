const n = 40;
const array=[];

GenerateArray();

function GenerateArray(){
    for(let i=0 ; i<n ; i++){
        array[i] = Math.random();
    }

    ShowBars();
}

// ___________Sorting____________________
function Sort(){
    const copy =[...array];
    const moves = SelectionSort(copy);
    Animate(moves);
}
// ________________________________________

// ___________Animation in swapping____________________
function Animate(moves){
    if(moves.length==0){
        ShowBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type =="swap"){
        [array[i],array[j]] = [array[j],array[i]];
    }

    ShowBars(move);

    setTimeout(function(){
        Animate(moves);
    }, 100);
}
// ________________________________________

// ___________Selection Sort____________________
function SelectionSort(array){
    const moves = []; //making a swap array that keeps track of swapping done while soting
    
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < array.length-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < array.length; j++){

            moves.push({indices:[i,j], type:"comp"});

            if (array[j] < array[min_idx]){
                min_idx = j;
            }
        }
 
        // Swap the found minimum element with the first element
        moves.push({indices:[min_idx,i], type:"swap"}); //pushing bar i-1 and bar i

        // swap(array,min_idx, i);
        var temp = array[min_idx];
        array[min_idx] = array[i];
        array[i] = temp;
    }

    return moves;
}

// ________________________________________


// ___________Creating bars & styling it____________________
function ShowBars(move){
    container.innerHTML="";
    for(let i = 0; i < array.length; i++)
    {
        const bar = document.createElement("div"); //bars will be displayed in container class
        bar.style.height = array[i] * 100 + "%"; //bar height will be 100 times the array value
        bar.classList.add("bar"); //styling will be done in bar class

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = move.type == "swap"?"red":"blue";
        }

        container.appendChild(bar);
    }
}
// ________________________________________