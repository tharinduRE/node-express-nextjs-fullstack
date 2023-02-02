import { TableView } from "@components/ui/DataTable";
import { format } from "date-fns";
import { Product } from "../../../types/product";
import { HeadCell } from "../../ui/DataTable/HeadCell";

const headCells: HeadCell<Product>[] = [
  {
    id: "itemId",
  },
  {
    id: "name",
    nonSortable: true,
  },
  {
    id: "description",
    searchable: true,
  },
  {
    id: "listPrice",
    // searchable: true,
  },
  {
    id: "category",
    // searchable: true,
  },
  {
    id: "subcategory",
    // searchable: true,
  },
  {
    id: 'createdAt',
    formatter(x) {
      return format(new Date(x), "MM-dd-yyyy");
    },
  },
];

export default function ProductTable(props: any) {
  return <TableView {...props} headCells={headCells}/>;
}
