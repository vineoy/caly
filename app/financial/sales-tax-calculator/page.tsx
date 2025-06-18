"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SalesTaxCalculatorPage() {
  const [price, setPrice] = useState("100")
  const [taxRate, setTaxRate] = useState("8.5")
  const [result1, setResult1] = useState<{tax:string, total:string} | null>(null)
  
  const [totalPrice, setTotalPrice] = useState("108.50")
  const [taxRate2, setTaxRate2] = useState("8.5")
  const [result2, setResult2] = useState<{tax:string, preTax:string} | null>(null)

  const calculateTax = () => {
    const p = parseFloat(price)
    const r = parseFloat(taxRate) / 100
    const tax = p * r;
    const total = p + tax;
    setResult1({tax: tax.toFixed(2), total: total.toFixed(2)})
  }
  
  const reverseCalculate = () => {
    const total = parseFloat(totalPrice)
    const r = parseFloat(taxRate2) / 100
    const preTax = total / (1 + r);
    const tax = total - preTax;
    setResult2({tax: tax.toFixed(2), preTax: preTax.toFixed(2)})
  }

  return (
    <div className="flex justify-center items-center py-8">
       <Tabs defaultValue="forward" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forward">Calculate Total</TabsTrigger>
            <TabsTrigger value="reverse">Reverse Calculate</TabsTrigger>
        </TabsList>
        <TabsContent value="forward">
            <Card>
                <CardHeader>
                    <CardTitle>Sales Tax Calculator</CardTitle>
                    <CardDescription>Calculate total price including tax.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <InputWithLabel label="Price Before Tax ($)" value={price} onChange={setPrice} />
                    <InputWithLabel label="Sales Tax Rate (%)" value={taxRate} onChange={setTaxRate} />
                    <Button onClick={calculateTax}>Calculate</Button>
                    {result1 && (
                        <div className="p-4 bg-muted rounded-md text-center">
                            <p>Sales Tax: <span className="font-bold">${result1.tax}</span></p>
                            <p>Total Price: <span className="font-bold">${result1.total}</span></p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="reverse">
            <Card>
                <CardHeader>
                     <CardTitle>Reverse Sales Tax</CardTitle>
                    <CardDescription>Calculate price before tax.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <InputWithLabel label="Total Price ($)" value={totalPrice} onChange={setTotalPrice} />
                    <InputWithLabel label="Sales Tax Rate (%)" value={taxRate2} onChange={setTaxRate2} />
                    <Button onClick={reverseCalculate}>Calculate</Button>
                    {result2 && (
                         <div className="p-4 bg-muted rounded-md text-center">
                            <p>Sales Tax: <span className="font-bold">${result2.tax}</span></p>
                            <p>Price Before Tax: <span className="font-bold">${result2.preTax}</span></p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
       </Tabs>
    </div>
  )
}

function InputWithLabel({label, value, onChange} : {label:string, value:string, onChange: (v:string) => void}) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Input type="number" value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
} 