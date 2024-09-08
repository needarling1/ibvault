const Pagination = ( {totalPosts, postsPerPage, setCurrentPage, currentPage} ) => {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < Math.ceil(totalPosts/postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
  
    return (
    <div>

    <button key = 'prev' onClick = {handlePrevClick} className = "px-2">Prev</button>

        {
            pages.map((page, index) => {
                return <button key = {index} onClick = {() => setCurrentPage(page)} className = "px-2">{page}</button>
            })
        }

    <button key = 'next' onClick = {handleNextClick} className = "px-2">Next</button>
    </div>
  )
}

export default Pagination;