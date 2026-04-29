
import OrderPanel from "../components/table/OrderPanel";
import TableManager from "../components/table/TableManager";
import "../styles/POSLayout.css";

export default function POSLayout() {
  return (
    <div className="pos-table">
      <main className="tables">
        <TableManager />
      </main>

      <section className="orders">
        <OrderPanel />
      </section>
    </div>
  );
}