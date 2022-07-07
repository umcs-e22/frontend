import React from "react";
import axios from "axios";

interface Book {
  author: string;
  price: number;
  title: string;
}

const BoxBookManage: React.FC<any> = () => {
  const [books, setBooks] = React.useState([]);
  const [change, setChange] = React.useState(-1);
  const [add, setAdd] = React.useState(false);

  const [price, setPrice] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const mounted: any = React.useRef();
  React.useEffect(() => {
    if (!mounted.current) {
      getPlayers();
      mounted.current = true;
    } else {
      // componentDidUpdate
    }
  });

  const getPlayers = () => {
    axios
      .get("/v1/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const deleteBook = (bookId: string) => {
    axios.delete(`v1/books/${bookId}`).then(() => getPlayers());
  };

  const updateBook = (bookId: string, book: Book) => {
    axios.put(`v1/books/${bookId}`, book).then(()=>getPlayers());
  };

  const addBook = (book: Book) => {
    axios.post(`v1/books`, book).then(() => getPlayers());
  };

  return (
    <div className="w-full h-full">
      <div className="mb-2 flex min-h-[56px]">
        <button
          onClick={() => {
            if (add) {
              setAdd(false);
              addBook({
                title,
                author,
                price,
              });
            }else{
              setAdd(true);
              setAuthor("");
              setPrice(0);
              setTitle("");
            }
          }}
          className="p-1 px-2 rounded text-zinc-50 bg-lime-700 h-fit self-center mr-3"
        >
          {add ? "Zapisz" : "Dodaj"}
        </button>
        {add && (
          <div className="flex gap-2 bg-lime-700 p-3 w-fit rounded">
            <input
              className="bg-zinc-200 p-1 rounded-sm"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="bg-zinc-200 p-1 rounded-sm"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="bg-zinc-200 p-1 rounded-sm"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <button
              onClick={() => setAdd(false)}
              className="p-1 px-2 rounded text-zinc-50 bg-red-700 h-fit self-center mr-3"
            >
              Anuluj
            </button>
          </div>
        )}
      </div>
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
                  {books.map((book: any, index: number) => (
                    <tr key={book.bookUUID}>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          change === index && "w-32"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            {index === change ? (
                              <input
                                className="bg-zinc-200 p-1 rounded-sm"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            ) : (
                              <div className="text-sm font-medium text-gray-900">
                                {book.title ? book.title : "Nieznane"}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          change === index && "w-32"
                        }`}
                      >
                        <div className="flex items-center">
                          {index === change ? (
                            <input
                              className="bg-zinc-200 p-1 rounded-sm"
                              type="text"
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900 ">
                              {book.author ? book.author : "Nieznana"}
                            </div>
                          )}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          change === index && "w-32"
                        }`}
                      >
                        <div className="flex items-center">
                          {index === change ? (
                            <input
                              className="bg-zinc-200 p-1 rounded-sm"
                              type="number"
                              value={price}
                              onChange={(e) =>
                                setPrice(parseFloat(e.target.value))
                              }
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">
                              {book.price ? book.price : "Brak Danych"}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-500 font-medium">
                        <button
                          onClick={() => deleteBook(book.bookUUID)}
                          className="p-2 rounded text-zinc-50 bg-red-700"
                        >
                          Usuń
                        </button>
                        <button
                          onClick={() => {
                            if (change === index) {
                              updateBook(book.bookUUID, {
                                title,
                                author,
                                price,
                              });
                              setChange(-1);
                            } else {
                              setChange(index);
                              setAuthor(book.author);
                              setPrice(book.price);
                              setTitle(book.title);
                            }
                          }}
                          className={`ml-2 p-2 rounded text-zinc-50 bg-indigo-500 ${
                            change === index && "bg-emerald-400"
                          }`}
                        >
                          {change === index ? "Zapisz" : "Zmień"}
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

export default BoxBookManage;
