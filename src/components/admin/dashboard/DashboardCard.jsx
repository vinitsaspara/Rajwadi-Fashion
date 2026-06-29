import { Card, CardContent } from "@/components/ui/card";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "text-black",
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">

      <CardContent className="p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {value}
            </h2>

          </div>

          <div
            className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ${color}`}
          >
            <Icon size={30} />
          </div>

        </div>

      </CardContent>

    </Card>
  );
}