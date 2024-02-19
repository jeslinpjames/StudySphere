import Card from "./Card";

function FlashCardList({flashcards}){
    return(
    <div className="card-grid">
    {
        flashcards.map(flashcard=>{
            return <Card flashcard={flashcard} key={flashcard.id}/>
        })
    }
    </div>
    )
}

export default FlashCardList;