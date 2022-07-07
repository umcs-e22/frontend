import React from "react";
import axios from "axios";

const BoxPlayersList: React.FC<any> = () => {
  const [books, setBooks] = React.useState([]);

  const mounted: any = React.useRef();
  React.useEffect(() => {
    if (!mounted.current) {
      getPlayers();
      mounted.current = true;
    } else {
      // componentDidUpdate
    }
  });

  console.log(books);

  const getPlayers = () => {
    axios
      .get("/v1/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const addToCart = (bookId: string) => {
    axios.post("v1/carts/add", {
      booksUUID: [bookId],
    });
  }

  return (
    <div className="flex flex-col">
      {books?.length > 0 && (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tytuł
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Autor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cena
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book: any) => (
                    <tr key={book.bookUUID}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {book.title ? book.title : "Nieznane"}{" "}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {book.author ? book.author : "Nieznana"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {book.price ? book.price : "Brak Danych"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-500 font-medium">
                        <button
                          onClick={() => addToCart(book.bookUUID)}
                          className="bg-emerald-600 p-2 rounded text-zinc-50"
                        >
                          Dodaj do koszyka
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxPlayersList;
