
import { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { ProductsTable } from "@/components/ProductsTable";
import { Summary } from "@/components/Summary";

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  stock: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
    };
    setProducts([...products, newProduct]);
  };

  const totalInvestment = products.reduce((sum, product) => sum + (product.cost * product.stock), 0);
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const totalProfit = totalRevenue - totalInvestment;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Gestão de Estoque</h1>
        <p className="text-muted-foreground">
          Gerencie seus produtos, custos e lucros em um só lugar
        </p>
      </div>

      <Summary
        totalInvestment={totalInvestment}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Adicionar Produto</h2>
        <ProductForm onSubmit={handleAddProduct} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Produtos em Estoque</h2>
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default Index;
