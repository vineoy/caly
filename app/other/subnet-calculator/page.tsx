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
import { ip, Netmask, Subnet } from "ip-subnet-calculator"

export default function SubnetCalculatorPage() {
  const [ipAddress, setIpAddress] = useState("192.168.1.1")
  const [subnetMask, setSubnetMask] = useState("255.255.255.0")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>("")

  const calculateSubnet = () => {
    try {
      if (!ip.isV4(ipAddress) || !Netmask.isV4(subnetMask)) {
        setError("Invalid IP address or subnet mask.")
        setResult(null)
        return
      }
      
      const subnet = new Subnet(ipAddress, subnetMask)
      setResult({
        networkAddress: subnet.getNetwork().toString(),
        broadcastAddress: subnet.getBroadcast().toString(),
        firstHost: subnet.getFirstHost().toString(),
        lastHost: subnet.getLastHost().toString(),
        numberOfHosts: subnet.getNumHosts(),
        subnetMask: subnet.getNetmask().toString(),
        cidr: subnet.getCIDR(),
      })
      setError("")
    } catch (e) {
      setError("Calculation failed. Please check your inputs.")
      setResult(null)
    }
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Subnet Calculator</CardTitle>
          <CardDescription>
            Calculate subnet information from an IP and subnet mask.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="ip-address">IP Address</Label>
            <Input
              id="ip-address"
              value={ipAddress}
              onChange={e => setIpAddress(e.target.value)}
              placeholder="e.g., 192.168.1.1"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subnet-mask">Subnet Mask</Label>
            <Input
              id="subnet-mask"
              value={subnetMask}
              onChange={e => setSubnetMask(e.target.value)}
              placeholder="e.g., 255.255.255.0"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={calculateSubnet} className="w-full">
            Calculate Subnet
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          {result && (
            <Card className="w-full bg-muted">
              <CardHeader><CardTitle>Subnet Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div><Label>Network Address:</Label> <p>{result.networkAddress}</p></div>
                <div><Label>Broadcast Address:</Label> <p>{result.broadcastAddress}</p></div>
                <div><Label>First Host:</Label> <p>{result.firstHost}</p></div>
                <div><Label>Last Host:</Label> <p>{result.lastHost}</p></div>
                <div><Label>Number of Hosts:</Label> <p>{result.numberOfHosts}</p></div>
                <div><Label>Subnet Mask:</Label> <p>{result.subnetMask}</p></div>
                <div><Label>CIDR:</Label> <p>/{result.cidr}</p></div>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 