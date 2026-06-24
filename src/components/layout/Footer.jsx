import Link from "next/link";

import Container from "../shared/Container";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 py-12">

          {/* Company */}

          <div>
            <h3 className="font-bold text-xl mb-4">
              Rajwadi Fashion
            </h3>

            <p className="text-gray-400">
              Premium Traditional &
              Modern Fashion Collection.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <div className="space-y-2">
              <Link href="/">
                Home
              </Link>

              <br />

              <Link href="/products">
                Products
              </Link>

              <br />

              <Link href="/cart">
                Cart
              </Link>
            </div>
          </div>

          {/* Customer */}

          <div>
            <h4 className="font-semibold mb-4">
              Customer
            </h4>

            <div className="space-y-2">
              <p>My Orders</p>
              <p>Wishlist</p>
              <p>Profile</p>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <p>Surat, Gujarat</p>
            <p>support@rajwadi.com</p>
            <p>+91 XXXXX XXXXX</p>
          </div>

        </div>

        <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Rajwadi Fashion.
          All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}