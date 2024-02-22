import './pagination.css';

export default function Paginate({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='pagination'>
      {pages.map((page, index) => (
        <button key={index} onClick={() => handleClick(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
      ))}
    </div>
  );
}
