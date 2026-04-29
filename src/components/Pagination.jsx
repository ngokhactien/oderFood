import "./styles/Pagination.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];

    // luôn có trang 1
    pages.push(1);

    // 👇 dấu ... đầu
    if (page > 4) {
      pages.push("start-ellipsis");
    }

    // 👇 các page xung quanh current
    for (let i = page - 2; i <= page + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // 👇 dấu ... cuối (FIX CHỖ NÀY)
    if (page + 2 < totalPages - 1) {
      pages.push("end-ellipsis");
    }

    // luôn có trang cuối
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="pagination">
      {/* Prev */}
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        &lt;
      </button>

      {pages.map((p, index) =>
        typeof p === "string" ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={page === p ? "active" : ""}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
