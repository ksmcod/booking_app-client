interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 cursor-pointer border ${
              currentPage === number ? "bg-gray-200" : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}
