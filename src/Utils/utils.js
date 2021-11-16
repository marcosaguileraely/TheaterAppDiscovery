var rank = [
    { "rank": "0-2", "value": 1, "min": 0, "max": 1.9 },
    { "rank": "2-4", "value": 2, "min": 2, "max": 3.9 },
    { "rank": "4-6", "value": 3, "min": 4, "max": 5.9 },
    { "rank": "6-8", "value": 4, "min": 6, "max": 7.9 },
    { "rank": "8-10", "value": 5, "min": 8, "max": 10 }
]

export function filterRank(value){
    return rank.filter( item => item.value === Number(value) )
}