'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("https://intern-task-api.bravo68web.workers.dev/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    if (!token) {
      router.push('/sign-in') // Redirect to sign-in page
    } else {
      fetchProducts()
    }
  }, [token, router])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-muted-foreground">Discover our wide range of high-quality products</p>
      </header>
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search products..." type="search" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <img
                alt={product.title}
                className="object-cover w-full h-48"
                height="200"
                src={product.thumbnail}
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">{product.title}</CardTitle>
              <p className="font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="#">Load More Products</Link>
        </Button>
      </div>
    </div>
  )
}
