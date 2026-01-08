import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Single Record Row Component
const Record = ({ record, onDelete }) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {record.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {record.position}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {record.level}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          to={`/edit/${record._id}`}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(record._id)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

// Main Record List Component
export default function RecordList() {
  const [records, setRecords] = useState([]);

  // Fetch records from API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5050/record/");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRecords();
  }, []);

  // Delete a record
  const deleteRecord = async (id) => {
    try {
      await fetch(`http://localhost:5050/record/${id}`, { method: "DELETE" });
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {["Name", "Position", "Level", "Action"].map((header) => (
                  <th
                    key={header}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {records.map((record) => (
                <Record
                  key={record._id}
                  record={record}
                  onDelete={deleteRecord}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
