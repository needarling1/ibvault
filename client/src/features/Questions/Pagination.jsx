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

    <button key = 'prev' onClick = {handlePrevClick} className = "px-4 py-2 mx-0.5 my-2 border border-black border-solid rounded-sm hover:bg-gray-100">Prev</button>

        {
            pages.map((page, index) => {
                let isActive = (page == currentPage);
                return <button key = {index} onClick = {() => setCurrentPage(page)} 
                className = {`px-4 mx-0.5 py-2 my-2 border border-black border-solid rounded-sm ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
                
                >{page}</button>
            })
        }

    <button key = 'next' onClick = {handleNextClick} className = "px-4 py-2 my-2 mx-0.5 border border-black border-solid rounded-sm hover:bg-gray-100">Next</button>
    </div>
  )
}

export default Pagination;