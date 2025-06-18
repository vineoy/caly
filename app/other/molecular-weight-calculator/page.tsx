"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const atomicWeights: { [key: string]: number } = {
    'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011,
    'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305,
    'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'Ar': 39.948,
    'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996,
    'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38,
    'Ga': 69.723, 'Ge': 72.630, 'As': 74.922, 'Se': 78.971, 'Br': 79.904, 'Kr': 83.798,
    'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224, 'Nb': 92.906, 'Mo': 95.96,
    'Tc': 98, 'Ru': 101.07, 'Rh': 102.91, 'Pd': 106.42, 'Ag': 107.87, 'Cd': 112.41,
    'In': 114.82, 'Sn': 118.71, 'Sb': 121.76, 'Te': 127.60, 'I': 126.90, 'Xe': 131.29,
    'Cs': 132.91, 'Ba': 137.33, 'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24,
    'Pm': 145, 'Sm': 150.36, 'Eu': 151.96, 'Gd': 157.25, 'Tb': 158.93, 'Dy': 162.50,
    'Ho': 164.93, 'Er': 167.26, 'Tm': 168.93, 'Yb': 173.05, 'Lu': 174.97, 'Hf': 178.49,
    'Ta': 180.95, 'W': 183.84, 'Re': 186.21, 'Os': 190.23, 'Ir': 192.22, 'Pt': 195.08,
    'Au': 196.97, 'Hg': 200.59, 'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209,
    'At': 210, 'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.04, 'Pa': 231.04,
    'U': 238.03, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247, 'Cf': 251,
    'Es': 252, 'Fm': 257, 'Md': 258, 'No': 259, 'Lr': 262, 'Rf': 267, 'Db': 270,
    'Sg': 271, 'Bh': 270, 'Hs': 277, 'Mt': 276, 'Ds': 281, 'Rg': 280, 'Cn': 285,
    'Nh': 284, 'Fl': 289, 'Mc': 288, 'Lv': 293, 'Ts': 294, 'Og': 294
};

export default function MolecularWeightCalculatorPage() {
  const [formula, setFormula] = useState("H2O")
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState("")

  const calculateMolecularWeight = () => {
    const tokens = formula.match(/([A-Z][a-z]?)(\d*)/g);
    if (!tokens) {
      setError("Invalid chemical formula.");
      setResult(null);
      return;
    }

    let totalWeight = 0;
    for (const token of tokens) {
      const match = token.match(/([A-Z][a-z]?)(\d*)/);
      if(match){
          const element = match[1];
          const count = match[2] ? parseInt(match[2]) : 1;
          if (atomicWeights[element]) {
            totalWeight += atomicWeights[element] * count;
          } else {
            setError(`Element ${element} not found.`);
            setResult(null);
            return;
          }
      }
    }
    setResult(totalWeight);
    setError("");
  };


  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Molecular Weight Calculator</CardTitle>
          <CardDescription>
            Calculate the molecular weight of a chemical formula.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="formula">Chemical Formula</Label>
            <Input
              id="formula"
              value={formula}
              onChange={e => setFormula(e.target.value)}
              placeholder="e.g., H2O, C6H12O6"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateMolecularWeight} className="w-full">
            Calculate
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          {result !== null && (
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-center">
                  {result.toFixed(4)} g/mol
                </p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 