
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  existingProducts?: Product[];
}

export function ProductForm({ onSubmit, editingProduct, onCancelEdit, existingProducts = [] }: ProductFormProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleSelectExistingProduct = (productName: string) => {
    const selectedProduct = existingProducts.find(p => p.name === productName);
    if (selectedProduct) {
      setName(selectedProduct.name);
      setCost(selectedProduct.cost.toString());
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 glassmorphism rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {name || "Selecione um produto..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Procurar produto..." />
              <CommandList>
                <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                <CommandGroup>
                  {existingProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={handleSelectExistingProduct}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          name === product.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {product.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do produto"
          className="mt-2"
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

