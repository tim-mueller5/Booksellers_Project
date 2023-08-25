import BookCard from "./BookCard";

function AllBooks({ allBooks }) {

    const allBookCards = allBooks.map((book) => (<BookCard book={book} key={book.id}/>))

    return (
        <div>
            <h2>AllBooks Component</h2>
            <h2>All Book Cards:</h2>
            {allBookCards}
        </div>
    )
}

export default AllBooks;