
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantitySold: number;
}

interface ProductsTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
}

export function ProductsTable({ products, onEditProduct }: ProductsTableProps) {
  return (
    <div className="table-wrapper">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Custo</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Quantidade Vendida</TableHead>
            <TableHead>Lucro Unitário</TableHead>
            <TableHead>Lucro Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.cost)}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantitySold}</TableCell>
              <TableCell>{formatCurrency(product.price - product.cost)}</TableCell>
              <TableCell>{formatCurrency((product.price - product.cost) * product.quantitySold)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditProduct(product)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
