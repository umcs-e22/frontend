import React from "react";
import axios from "axios";
import { getCookies } from "../../utils/cookies";

const BoxPlayersList: React.FC<any> = () => {
  const [cart, setCart] = React.useState<any>({ books: {} });
  const [userID] = React.useState(getCookies().get("userUUID"));

  const mounted: any = React.useRef();
  React.useEffect(() => {
    if (!mounted.current) {
      getCart();
      mounted.current = true;
    } else {
      // componentDidUpdate
    }
  });

  const getCart = () => {
    axios
      .get(`/v1/carts/user/${userID}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  const removeFromCart = (bookId: string) => {
    axios.delete(`v1/carts/remove/${bookId}`).then(() => getCart());
  };

  const addToCart = (bookId: string) => {
    axios
      .post("v1/carts/add", {
        booksUUID: [bookId],
      })
      .then(() => getCart());
  };

  const order = (cartUUID: string) => {
    axios
      .post("/v1/payments", {
        cartUUID,
        totalAmount: (cart.price * 100).toFixed(0).toString(),
        buyer: {
          email: "example@wp.pl",
          language: "pl",
        },
        products: cart.books.map((book: any) => ({
          name: book.title,
          unitPrice: (book.price.toFixed(2) * 100).toString(),
          quantity: book.count.toString(),
        })),
      })
      .then((res: any) => {
        window.location = res.data.redirectUri;
      });
  };

  return (
    <div className="flex flex-col">
      {cart?.books?.length > 0 ? (
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
                      Cena
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ilość
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart?.books.map((book: any) => (
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
                            {book.price
                              ? (book.price * book.count).toFixed(2)
                              : "Nieznana"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 flex gap-2">
                            <button
                              onClick={() => removeFromCart(book.bookUUID)}
                              className="bg-emerald-600 rounded-full w-6 text-zinc-50 hover:bg-emerald-700"
                            >
                              -
                            </button>
                            {book.count}
                            <button
                              onClick={() => addToCart(book.bookUUID)}
                              className="bg-emerald-600 rounded-full w-6 text-zinc-50 hover:bg-emerald-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => order(cart.cartUUID)}
                className="bg-emerald-600 p-2 rounded text-zinc-50 w-full hover:bg-emerald-700"
              >
                Zamów ({cart.price.toFixed(2)} zł)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Koszyk jest pusty</div>
      )}
    </div>
  );
};

export default BoxPlayersList;
