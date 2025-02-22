
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface SummaryProps {
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
}

export function Summary({ totalInvestment, totalRevenue, totalProfit }: SummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(totalInvestment)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(totalRevenue)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(totalProfit)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
