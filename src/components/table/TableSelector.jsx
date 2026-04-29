// const TableSelector = ({ table, setTable }) => {
//   const tables = Array.from({ length: 10 }, (_, i) => i + 1);

//   return (
//     <div>
//       <h2>Chọn bàn</h2>
//       <select
//         value={table || ""}
//         onChange={(e) => setTable(Number(e.target.value))}
//       >
//         <option value="">-- Chọn bàn --</option>
//         {tables.map((t) => (
//           <option key={t} value={t}>
//             Bàn {t}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default TableSelector;