
import { useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { ProductsTable } from "@/components/ProductsTable";
import { Summary } from "@/components/Summary";

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantitySold: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : product
      ));
      setEditingProduct(undefined);
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(undefined);
  };

  const totalInvestment = products.reduce((sum, product) => sum + (product.cost * product.quantitySold), 0);
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantitySold), 0);
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
        <h2 className="text-2xl font-semibold tracking-tight">
          {editingProduct ? "Editar Produto" : "Adicionar Produto"}
        </h2>
        <ProductForm 
          onSubmit={handleAddProduct} 
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Produtos Cadastrados</h2>
        <ProductsTable 
          products={products} 
          onEditProduct={handleEditProduct}
        />
      </div>
    </div>
  );
};

export default Index;
