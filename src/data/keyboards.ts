import checkArrays from "./compare_lite";

class Keyboard{
    functions(){
        return [
            [
                {text: "Карта дня"}
            ],
            [
                {text: "Пирамида любви"}
            ],
            [
                {text: "Полная чаша"}
            ],
            [
                {text: "Три карты"}
            ]
        ]
    }

    yesNo(){
        return [
            [
                {text: "Да"},
                {text: "Нет"}
            ]
        ]
    }

    ADMPANEL(){
        return [
            [
                {text: "Целевая функция"},
            ],
            [
                {text: "Комбинация"}
            ],
            [
                {text: "Количество доступных активаций"}
            ],
            [
                {text: "Платно/Бесплатно"}
            ],
            [
                {text: "Удалить"}
            ]
        ]
    }

    RegularButtons(keyboard: { text: string; }[][], input: string){
        return keyboard.flatMap((el: any) => el.map((el: any) => {return el.text})).includes(input);
    }

    CheckIfCombinationCorrect(input: string, combinations: any){
        const digits = input.split('').map(Number);
        const uniqueDigits = new Set(digits);
        if (digits.length === uniqueDigits.size && /^[0-9]{4}$/.test(input)){
            return checkArrays(combinations, input.split(''));
        }
        else return false
    }
}

export default new Keyboard();