export default function Footer() {
    return (
      <footer className="py-6 w-full border-t bottom-0">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Shweta Shirsath. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }