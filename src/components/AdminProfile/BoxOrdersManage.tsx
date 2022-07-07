import React from "react";
import axios from "axios";

const BoxOrdersManage: React.FC<any> = () => {
  const [orders, setOrders] = React.useState([]);

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
      .get("/v1/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const changeOrderStatus = (orderId: string, status: string) => {
    axios
      .put(`/v1/orders/${orderId}/changeStatus`, { status: status })
      .then(() => getPlayers());
  };

  return (
    <div className="w-full h-full">
      {orders?.length > 0 && (
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
                      ID zamówienia
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Zmiana statusu
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order: any, index: number) => (
                    <tr key={order.bookUUID}>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderUUID ? order.orderUUID : "Nieznane"}{" "}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 ">
                            {order.createDate
                              ? new Date(order.createDate).toDateString()
                              : "Nieznana"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          className={`form-select appearance-none block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white ${
                            order.status === "REALIZED" && "bg-green-600"
                          } ${
                            order.status === "IN_PROGRESS" && "bg-rose-500"
                          } ${order.status === "NEW" && "bg-cyan-500"}`}
                          aria-label="Default select example"
                          value={order.status}
                          onChange={(e) =>
                            changeOrderStatus(order.orderUUID, e.target.value)
                          }
                          disabled={order.status === "REALIZED"}
                        >
                          <option value="NEW">Nowy</option>
                          <option value="IN_PROGRESS">W trakcie</option>
                          <option value="REALIZED">Zrealizowany</option>
                        </select>
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

export default BoxOrdersManage;
