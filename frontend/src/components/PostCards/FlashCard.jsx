import React,{ useState } from "react";
import FlashCardList from "./FlashCardList";

function FlashCard(){
    const[flashCards,setFlashCards] = useState(sampleData)

    return(
        <>
        <div className="m-5">
            <FlashCardList flashcards={flashCards}/>
        </div>
        </>
    )
}

const sampleData = [
    {
        id:1,
        question:'What is who?',
        answer:'Boo is who',
        options:[
            '1',
            '2',
            '3'
        ]
    },
    {
        id:2,
        question:'What is who?',
        answer:'Boo is who',
        options:[
            '1',
            '2',
            '3'
        ]
    },
    {
        id:3,
        question:'What is who?',
        answer:'Boo is who',
        options:[
            '1',
            '2',
            '3'
        ]
    }
]

export default FlashCard;