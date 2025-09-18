import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";

export default function Home() {
  return (
    <AppLayout>
      <div className="p-4 w-screen h-screen flex justify-center items-center font-sans">
        <Card className="p-4 flex justify-center flex-col items-center gap-4">
          <h4>Let's see what we have for you</h4>
          <Button>
            <ArrowBigRight />
          </Button>
        </Card>
      </div>
    </AppLayout>
  );
}
