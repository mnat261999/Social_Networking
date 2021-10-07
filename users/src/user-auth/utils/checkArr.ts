export const compareArr = (otherArray)=>{
    return function(current){
        return otherArray.filter(function(other){
          return other.idUser == current.idUser && other.firstName == current.firstName && other.lastName == current.lastName
        }).length == 0;
    }
}