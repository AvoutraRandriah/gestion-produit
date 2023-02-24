export default {
    setValue(value){
    var reference= ''
    var number = ''
    value = value===null ? 0 : value
    for(var i=0;i<value.length;i++){
      if(isNaN(value[i])){

        reference+=value[i]

      }
      else {
        number+=value[i]
      }
    }
    const num = parseInt(number)+1
   // const max= (num < 10)? reference+'000'+num : reference+'00'+num 
    const max =(num<1000) ? (num<100) ? (num < 10)? reference+'000'+num : reference+'00'+num  : reference+'0'+num : reference+num
    //console.log(max)
    return max
  },
  toMaj(value){
    return value.slice(0, 1).toUpperCase()+ value.slice(1).toLowerCase()
  },
  toMoney(value){
   // console.log(value)
  if(value !== null || value !== undefined ){ 
    var n = value
    var res = n.replace(/(\d)(?=(\d{3})+\b)/g,'$1 ')
   return res
  }
  else return 0
  },
  groupBy(array){
    var data = array.reduce((r,a) => {
      r[a.nom] = [...r[a.nom] || [], a]
      return r
    }, {})
    return data
   },
   groupByKey(array,key){
    var data = array.reduce((r,a) => {
      r[a[key]] = [...r[a[key]] || [], a]
      return r
    }, {})
    return data
   }
  }




