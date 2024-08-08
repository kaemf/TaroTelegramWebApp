export default function Function(input: string, reverse?: string) {
    if (reverse === 'reverse') {
        switch(input){
            case "day_card":
                return "Карта дня";
            
            case "love":
                return "Пирамида любви";
            
            case "full":
                return "Полная чаша";
            
            case "cards":
                return "Три карты";
            
            default:
                return false;
        }
    }
    else{
        switch(input){
            case "Карта дня":
                return "day_card";
    
            case "Пирамида любви":
                return "love";
    
            case "Полная чаша":
                return "full";
            
            case "Три карты":
                return "cards";
    
            default:
                return false;
        }
    }
}