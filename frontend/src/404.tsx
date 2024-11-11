import Navbar from "./components/Navbar";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Navbar />
      <h1 className="text-[300px] font-bold text-green-500">404</h1>
      <p className="text-4xl  -mt-[80px] ">Page not found</p>
    </div>
  );
}
