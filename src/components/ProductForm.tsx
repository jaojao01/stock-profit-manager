
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProductFormProps {
  onSubmit: (product: {
    name: string;
    cost: number;
    price: number;
    stock: number;
  }) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !cost || !price || !stock) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    onSubmit({
      name,
      cost: Number(cost),
      price: Number(price),
      stock: Number(stock),
    });

    setName("");
    setCost("");
    setPrice("");
    setStock("");
    
    toast.success("Produto adicionado com sucesso!");
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
          <Label htmlFor="stock">Quantidade em Estoque</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Adicionar Produto
      </Button>
    </form>
  );
}
