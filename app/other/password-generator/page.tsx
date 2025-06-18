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
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy } from "lucide-react"

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numberChars = "0123456789"
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>/?"

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    let charset = lowercaseChars
    if (includeUppercase) charset += uppercaseChars
    if (includeNumbers) charset += numberChars
    if (includeSymbols) charset += symbolChars

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Password Generator</CardTitle>
          <CardDescription>
            Create a secure, random password.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center gap-2 p-4 bg-muted rounded-md">
            <Input readOnly value={password} className="text-lg font-mono" />
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-4">
            <div>
              <Label>Length: {length}</Label>
              <Slider
                value={[length]}
                onValueChange={([val]) => setLength(val)}
                min={8}
                max={64}
                step={1}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={checked => setIncludeUppercase(Boolean(checked))} />
              <Label htmlFor="uppercase">Include Uppercase Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={checked => setIncludeNumbers(Boolean(checked))} />
              <Label htmlFor="numbers">Include Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={checked => setIncludeSymbols(Boolean(checked))} />
              <Label htmlFor="symbols">Include Symbols</Label>
            </div>
          </div>
          <Button onClick={generatePassword} className="w-full">
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 