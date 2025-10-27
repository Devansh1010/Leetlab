var twoSum = function(nums, target) {
    const arr = []
    for(i = 0, i<=nums.length-1; i++;) {
        if(nums[i] <= target) {continue}

        console.log('Current Num:', nums[i])
        for(j = i+1, j<=nums.length-1; j++;){
            let sum = nums[i] + nums[j]
            console.log('Checking Num:', nums[j], ' Sum:', sum)
            if(sum === target){
                arr.push(nums[i])
                arr.push(nums[j])
            } 
        }
    }

    return arr
};

const result = twoSum([2,7,11,15], 9)
console.log(result)