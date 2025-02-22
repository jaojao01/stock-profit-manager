
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantitySold: number;
}

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => void;
  editingProduct?: Product;
  onCancelEdit?: () => void;
}

export function ProductForm({ onSubmit, editingProduct, onCancelEdit }: ProductFormProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [quantitySold, setQuantitySold] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCost(editingProduct.cost.toString());
      setPrice(editingProduct.price.toString());
      setQuantitySold(editingProduct.quantitySold.toString());
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !cost || !price || !quantitySold) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    onSubmit({
      name,
      cost: Number(cost),
      price: Number(price),
      quantitySold: Number(quantitySold),
    });

    setName("");
    setCost("");
    setPrice("");
    setQuantitySold("");
    
    toast.success(editingProduct ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 glassmorphism rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do produto"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cost">Preço de Custo (R$)</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0,00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Preço de Venda (R$)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0,00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantitySold">Quantidade Vendida</Label>
          <Input
            id="quantitySold"
            type="number"
            min="0"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
      
      <div className="flex gap-2 justify-end">
        {editingProduct && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
        <Button type="submit">
          {editingProduct ? "Atualizar Produto" : "Adicionar Produto"}
        </Button>
      </div>
    </form>
  );
}
