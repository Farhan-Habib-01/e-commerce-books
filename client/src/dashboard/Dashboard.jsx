import {
  BookOpen,
  PlusCircle,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your book store from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            to="/admin/dashboard/manage"
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <BookOpen className="mb-4 h-10 w-10 text-blue-600" />

            <h2 className="text-xl font-bold text-gray-900">
              Manage Books
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              View, edit and delete books.
            </p>
          </Link>

          <Link
            to="/admin/dashboard/upload"
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <PlusCircle className="mb-4 h-10 w-10 text-green-600" />

            <h2 className="text-xl font-bold text-gray-900">
              Upload Book
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add a new book to your store.
            </p>
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Settings className="mb-4 h-10 w-10 text-gray-600" />

            <h2 className="text-xl font-bold text-gray-900">
              Store Management
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage your online book store.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;