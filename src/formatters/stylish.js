import  _  from "lodash";

export default function makeStylish(tree){
    console.log(tree)
    function getStrings(node){
        if(Array.isArray(node)){    
            console.log(111,node)
            let result = node.map((elem) => {
                switch(elem.type) {
                    case 'added' :
                return `  + ${elem.key}: ${elem.value}`;
                   case 'deleted' :
                return `  - ${elem.key}: ${elem.value}`
                    case 'unchanged' :
                return `    ${elem.key}: ${elem.value}`;
                   case 'nested' : {
                    const children = elem.children.map((child) => getStrings(child))
                return children
                   }
                   case 'changed' :
                    return `  - ${elem.key}: ${elem.values[0]}\n  + ${elem.key}: ${elem.values[1]}`
                    default:
                       throw new Error(`ошибка ${elem}`)
                
                  
                }
                
        
            })
        }else { 
            switch(node.type) {
                case 'added' :
            return `  + ${node.key}: ${node.value}`;
               case 'deleted' :
            return `  - ${node.key}: ${node.value}`
                case 'unchanged' :
            return `    ${node.key}: ${node.value}`;
               case 'nested' : {
                const children = node.children.map((child) => getStrings(child))
            return children
               }
               case 'changed' :
                return `  - ${elem.key}: ${elem.values[0]}\n  + ${elem.key}: ${elem.values[1]}`
                default:
                   throw new Error(`ошибка ${elem}`);
              
            }
    
        
            
        }
        return result
    } 
    return getStrings(tree)
   
}