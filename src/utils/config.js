export function NumberWithCommas(x){
    if(x) return `₹ ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}`

}