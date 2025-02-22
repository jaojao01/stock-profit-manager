
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, DownloadIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import * as XLSX from 'xlsx';
import { toast } from "sonner";

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
  const exportToExcel = () => {
    try {
      // Preparar os dados para exportação
      const exportData = products.map(product => ({
        'Nome do Produto': product.name,
        'Preço de Custo (R$)': product.cost,
        'Preço de Venda (R$)': product.price,
        'Quantidade Vendida': product.quantitySold,
        'Lucro Unitário (R$)': product.price - product.cost,
        'Lucro Total (R$)': (product.price - product.cost) * product.quantitySold
      }));

      // Criar uma nova planilha
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Produtos");

      // Gerar o arquivo Excel
      XLSX.writeFile(wb, "produtos.xlsx");
      
      toast.success("Planilha exportada com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar a planilha");
      console.error("Erro ao exportar:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={exportToExcel}
          className="flex items-center gap-2"
          variant="outline"
        >
          <DownloadIcon className="h-4 w-4" />
          Exportar para Excel
        </Button>
      </div>
      
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
    </div>
  );
}
